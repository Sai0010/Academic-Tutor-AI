package com.example.academictutor

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.example.academictutor.ui.theme.AcademicTutorTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            AcademicTutorTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    TutorScreen()
                }
            }
        }
    }
}

@Composable
fun TutorScreen() {
    var input by remember { mutableStateOf("") }
    var loading by remember { mutableStateOf(false) }
    
    Column(modifier = Modifier.padding(16.dp)) {
        Text(
            text = "Academic Tutor AI",
            style = MaterialTheme.typography.headlineMedium,
            modifier = Modifier.padding(bottom = 16.dp)
        )
        
        OutlinedTextField(
            value = input,
            onValueChange = { input = it },
            label = { Text("Enter concept or question") },
            modifier = Modifier.fillMaxWidth(),
            minLines = 3
        )
        
        Button(
            onClick = { /* Call ViewModel Logic */ },
            modifier = Modifier.padding(top = 16.dp).fillMaxWidth(),
            enabled = !loading && input.isNotBlank()
        ) {
            Text(if (loading) "Thinking..." else "Explain")
        }
        
        // Results would be displayed here using a LazyColumn
    }
}
