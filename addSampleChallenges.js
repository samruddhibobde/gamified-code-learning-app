require('dotenv').config();
const mongoose = require('mongoose');
const Challenge = require('./models/challenge');

const sampleChallenges = [
  {
    title: "Hello World",
    description: "Write a program that prints 'Hello, World!' to the console.",
    difficulty: "Easy",
    category: "Basics",
    starterCode: "# Write your code here\nprint('Hello, World!')",
    correctAnswer: "Hello, World!",
    language_id: 71, // Python 3
    points: 10,
    testCases: [
      { input: "", output: "Hello, World!" }
    ],
    hints: [
      { text: "Use the print() function in Python", cost: 2 },
      { text: "Make sure to include the exact text with correct punctuation", cost: 3 }
    ]
  },
  {
    title: "Sum of Two Numbers",
    description: "Write a program that takes two numbers as input and prints their sum.",
    difficulty: "Easy",
    category: "Math",
    starterCode: "# Read two numbers and print their sum\na = int(input())\nb = int(input())\n# Your code here",
    correctAnswer: "15",
    language_id: 71,
    points: 15,
    testCases: [
      { input: "7\n8", output: "15" },
      { input: "10\n5", output: "15" }
    ],
    hints: [
      { text: "Use the + operator to add two numbers", cost: 2 },
      { text: "Don't forget to convert input to integers using int()", cost: 3 }
    ]
  },
  {
    title: "Even or Odd",
    description: "Write a program that takes a number as input and prints whether it's even or odd.",
    difficulty: "Medium",
    category: "Logic",
    starterCode: "# Check if a number is even or odd\nnum = int(input())\n# Your code here",
    correctAnswer: "Even",
    language_id: 71,
    points: 20,
    testCases: [
      { input: "4", output: "Even" },
      { input: "7", output: "Odd" }
    ],
    hints: [
      { text: "Use the modulo operator (%) to check divisibility", cost: 3 },
      { text: "A number is even if num % 2 == 0", cost: 4 }
    ]
  },
  {
    title: "Factorial Calculator",
    description: "Write a program that calculates the factorial of a given number.",
    difficulty: "Hard",
    category: "Math",
    starterCode: "# Calculate factorial of a number\nn = int(input())\n# Your code here",
    correctAnswer: "120",
    language_id: 71,
    points: 30,
    testCases: [
      { input: "5", output: "120" },
      { input: "3", output: "6" }
    ],
    hints: [
      { text: "Factorial can be calculated using a loop", cost: 5 },
      { text: "Factorial of n = n * (n-1) * (n-2) * ... * 1", cost: 6 },
      { text: "Don't forget that 0! = 1", cost: 7 }
    ]
  }
];

async function addSampleChallenges() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing challenges
    await Challenge.deleteMany({});
    console.log('Cleared existing challenges');

    // Add sample challenges
    const insertedChallenges = await Challenge.insertMany(sampleChallenges);
    console.log(`Added ${insertedChallenges.length} sample challenges:`);
    
    insertedChallenges.forEach((challenge, index) => {
      console.log(`${index + 1}. ${challenge.title} (${challenge.difficulty}) - ${challenge.points} points`);
    });

    console.log('\n✅ Sample challenges added successfully!');
  } catch (error) {
    console.error('Error adding sample challenges:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

addSampleChallenges();
