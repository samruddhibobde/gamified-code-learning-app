const axios = require("axios");

const JUDGE0_API_URL = "https://judge0-ce.p.rapidapi.com/submissions";
const JUDGE0_API_HOST = "judge0-ce.p.rapidapi.com";
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;

// Mock responses for testing without API key
const mockResponses = {
  "Hello, World!": {
    stdout: "Hello, World!",
    stderr: "",
    compile_output: "",
    status: { id: 3, description: "Accepted" },
    time: 0.05,
    memory: 1280
  },
  "print('Hello, World!')": {
    stdout: "Hello, World!",
    stderr: "",
    compile_output: "",
    status: { id: 3, description: "Accepted" },
    time: 0.05,
    memory: 1280
  },
  "print(7 + 8)": {
    stdout: "15",
    stderr: "",
    compile_output: "",
    status: { id: 3, description: "Accepted" },
    time: 0.03,
    memory: 1024
  },
  "print('Wrong')": {
    stdout: "Wrong",
    stderr: "",
    compile_output: "",
    status: { id: 3, description: "Accepted" },
    time: 0.02,
    memory: 1024
  }
};

const pollJudge0Result = async (token) => {
  const maxAttempts = 20;
  const delay = 1000;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      console.log(`Polling attempt ${attempt + 1} for token: ${token}`);
      
      const response = await axios.get(
        `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
        {
          headers: {
            "X-RapidAPI-Key": RAPIDAPI_KEY,
            "X-RapidAPI-Host": JUDGE0_API_HOST,
          },
        }
      );

      const result = response.data;
      console.log(`Judge0 status: ${result.status?.id} - ${result.status?.description}`);

      if (result.status?.id >= 3) {
        return result;
      }

      await new Promise(resolve => setTimeout(resolve, delay));
    } catch (error) {
      console.error(`Polling attempt ${attempt + 1} failed:`, error.message);
      if (attempt === maxAttempts - 1) {
        throw error;
      }
    }
  }

  throw new Error("Timeout waiting for code execution result");
};

const executeCode = async (source_code, language_id, stdin = "") => {
  console.log(`Executing code with language_id: ${language_id}`);
  console.log(`Source code: ${source_code.substring(0, 100)}...`);

  // If no API key, use mock response
  if (!RAPIDAPI_KEY || RAPIDAPI_KEY === "your_rapidapi_key_here") {
    console.log("Using mock response (no valid API key)");
    
    // Check for mock responses
    const mockKey = Object.keys(mockResponses).find(key => 
      source_code.includes(key.trim())
    );
    
    if (mockKey) {
      return mockResponses[mockKey];
    }
    
    // Default mock response
    return {
      stdout: "Mock output - add real RapidAPI key for actual execution",
      stderr: "",
      compile_output: "",
      status: { id: 3, description: "Accepted" },
      time: 0.05,
      memory: 1024
    };
  }

  // Real API call
  try {
    const judge0Response = await axios.post(
      JUDGE0_API_URL,
      {
        source_code,
        language_id,
        stdin,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": RAPIDAPI_KEY,
          "X-RapidAPI-Host": JUDGE0_API_HOST,
        },
      }
    );

    const token = judge0Response.data.token;
    console.log(`Judge0 submission token: ${token}`);

    return await pollJudge0Result(token);
  } catch (error) {
    console.error("Judge0 API error:", error.message);
    if (error.response?.status === 403) {
      throw new Error("Invalid RapidAPI key. Please check your RAPIDAPI_KEY in .env file.");
    }
    throw error;
  }
};

module.exports = {
  executeCode,
};
