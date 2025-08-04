# Problem Solving Platform API Documentation

## Overview

This document describes the backend API for the problem-solving platform (similar to LeetCode/AlgoExpert). The API is built with Next.js, Prisma, and MongoDB.

## Base URL

```
/api/v1
```

## Authentication

All endpoints require authentication except where noted. Use the existing NextAuth session.

## Data Models

### Topic

- **id**: Unique identifier
- **name**: Topic name (e.g., "Algorithms", "Data Structures")
- **slug**: URL-friendly identifier
- **description**: Optional description
- **difficulty**: BEGINNER, INTERMEDIATE, ADVANCED
- **type**: CORE_CS, SPECIALIZED, LANGUAGE, FRAMEWORK, TOOL
- **problemCount**: Number of problems in this topic
- **tags**: Array of tags (e.g., ["Architecture", "Languages"])
- **isActive**: Whether the topic is active
- **order**: Display order
- **createdAt/updatedAt**: Timestamps

### Problem

- **id**: Unique identifier
- **topicId**: Reference to parent topic
- **title**: Problem title
- **slug**: URL-friendly identifier
- **description**: Problem description
- **difficulty**: EASY, MEDIUM, HARD
- **tags**: Array of tags (e.g., ["Sorting", "Greedy"])
- **companyTags**: Array of company tags (e.g., ["Google", "Microsoft"])
- **timeLimit**: Time limit in milliseconds
- **memoryLimit**: Memory limit in MB
- **successRate**: Success rate percentage
- **score**: Problem score
- **isActive**: Whether the problem is active
- **order**: Display order
- **createdAt/updatedAt**: Timestamps

### Submission

- **id**: Unique identifier
- **userId**: Reference to user
- **problemId**: Reference to problem
- **language**: Programming language
- **code**: Submitted code
- **status**: PENDING, RUNNING, ACCEPTED, WRONG_ANSWER, etc.
- **runtime**: Execution time in milliseconds
- **memory**: Memory usage in MB
- **score**: Percentage score
- **error**: Error message if failed
- **submittedAt**: Submission timestamp

### UserProblemStatus

- **id**: Unique identifier
- **userId**: Reference to user
- **problemId**: Reference to problem
- **status**: UNSOLVED, ATTEMPTED, SOLVED
- **lastAttempted**: Last attempt timestamp
- **bestScore**: Best score achieved
- **attempts**: Number of attempts

## API Endpoints

### Topics

#### GET /topics

List all topics with filtering and pagination.

**Query Parameters:**

- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `difficulty` (optional): Filter by difficulty
- `type` (optional): Filter by type
- `search` (optional): Search in name and description
- `tags` (optional): Comma-separated tags to filter by

**Response:**

```json
{
    "success": true,
    "data": [
        {
            "id": "topic_id",
            "name": "Algorithms",
            "slug": "algorithms",
            "description": "Core algorithmic concepts",
            "difficulty": "INTERMEDIATE",
            "type": "CORE_CS",
            "problemCount": 25,
            "tags": ["Architecture", "Languages"],
            "isActive": true,
            "order": 1,
            "createdAt": "2024-01-01T00:00:00Z",
            "updatedAt": "2024-01-01T00:00:00Z"
        }
    ],
    "pagination": {
        "page": 1,
        "limit": 10,
        "total": 50,
        "totalPages": 5,
        "hasNext": true,
        "hasPrev": false
    }
}
```

#### POST /topics

Create a new topic (Admin only).

**Request Body:**

```json
{
    "name": "New Topic",
    "description": "Topic description",
    "difficulty": "BEGINNER",
    "type": "CORE_CS",
    "tags": ["Architecture"],
    "order": 1
}
```

#### GET /topics/{topicId}

Get a specific topic by ID.

#### PUT /topics/{topicId}

Update a topic (Admin only).

#### DELETE /topics/{topicId}

Delete a topic (Admin only).

### Problems

#### GET /problems

List all problems with filtering and pagination.

**Query Parameters:**

- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `topicId` (optional): Filter by topic
- `difficulty` (optional): Filter by difficulty
- `status` (optional): Filter by user status (UNSOLVED, ATTEMPTED, SOLVED)
- `search` (optional): Search in title and description
- `tags` (optional): Comma-separated tags to filter by
- `companyTags` (optional): Comma-separated company tags to filter by

**Response:**

```json
{
    "success": true,
    "data": [
        {
            "id": "problem_id",
            "title": "Two Sum",
            "slug": "two-sum",
            "description": "Find two numbers that add up to target",
            "difficulty": "EASY",
            "tags": ["Array", "Hash Table"],
            "companyTags": ["Google", "Microsoft"],
            "timeLimit": 3000,
            "memoryLimit": 256,
            "successRate": 85.5,
            "score": 100,
            "topic": {
                "id": "topic_id",
                "name": "Algorithms",
                "slug": "algorithms"
            },
            "status": "UNSOLVED",
            "lastAttempted": null,
            "bestScore": null,
            "attempts": 0,
            "submissionCount": 1250,
            "isActive": true,
            "order": 1,
            "createdAt": "2024-01-01T00:00:00Z",
            "updatedAt": "2024-01-01T00:00:00Z"
        }
    ],
    "pagination": {
        "page": 1,
        "limit": 10,
        "total": 100,
        "totalPages": 10,
        "hasNext": true,
        "hasPrev": false
    }
}
```

#### POST /problems

Create a new problem (Admin only).

**Request Body:**

```json
{
    "topicId": "topic_id",
    "title": "New Problem",
    "description": "Problem description",
    "difficulty": "EASY",
    "tags": ["Array"],
    "companyTags": ["Google"],
    "timeLimit": 3000,
    "memoryLimit": 256,
    "score": 100,
    "order": 1
}
```

#### GET /problems/{problemId}

Get a specific problem by ID.

#### PUT /problems/{problemId}

Update a problem (Admin only).

#### DELETE /problems/{problemId}

Delete a problem (Admin only).

#### GET /problems/{problemId}/test-cases

Get test cases for a problem (input/output hidden for non-admins).

#### POST /problems/{problemId}/test-cases

Create a test case for a problem (Admin only).

**Request Body:**

```json
{
    "input": "1 2 3",
    "output": "6",
    "isHidden": false,
    "order": 1
}
```

### Submissions

#### GET /submissions

List user's submissions with filtering and pagination.

**Query Parameters:**

- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `problemId` (optional): Filter by problem
- `status` (optional): Filter by submission status
- `language` (optional): Filter by programming language

**Response:**

```json
{
    "success": true,
    "data": [
        {
            "id": "submission_id",
            "problemId": "problem_id",
            "language": "python",
            "status": "ACCEPTED",
            "runtime": 45,
            "memory": 14,
            "score": 100,
            "error": null,
            "submittedAt": "2024-01-01T00:00:00Z",
            "problem": {
                "id": "problem_id",
                "title": "Two Sum",
                "slug": "two-sum",
                "difficulty": "EASY",
                "topic": {
                    "id": "topic_id",
                    "name": "Algorithms",
                    "slug": "algorithms"
                }
            },
            "testResults": [
                {
                    "status": "PASSED",
                    "runtime": 45,
                    "memory": 14,
                    "error": null
                }
            ]
        }
    ],
    "pagination": {
        "page": 1,
        "limit": 10,
        "total": 50,
        "totalPages": 5,
        "hasNext": true,
        "hasPrev": false
    }
}
```

#### POST /submissions

Submit a solution for a problem.

**Request Body:**

```json
{
    "problemId": "problem_id",
    "language": "python",
    "code": "def twoSum(nums, target):\n    # Your solution here\n    pass"
}
```

**Response:**

```json
{
    "success": true,
    "data": {
        "id": "submission_id",
        "status": "PENDING",
        "message": "Submission received and being processed"
    }
}
```

## Error Responses

All endpoints return consistent error responses:

```json
{
    "success": false,
    "message": "Error description"
}
```

Common HTTP status codes:

- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `404`: Not Found
- `409`: Conflict
- `500`: Internal Server Error

## Code Execution Integration

The submission endpoint currently includes a simulation of code execution. In production, you should integrate with:

1. **Docker-based execution**: Run code in isolated containers
2. **Cloud execution services**: AWS Lambda, Google Cloud Functions
3. **Specialized platforms**: Judge0, Sphere Engine

## Security Considerations

1. **Input validation**: All inputs are validated
2. **Rate limiting**: Implement rate limiting for submissions
3. **Code execution**: Run code in isolated environments
4. **Access control**: Admin-only endpoints are protected
5. **Data sanitization**: Sanitize all user inputs

## Database Schema

The platform uses MongoDB with the following collections:

- `topics`: Problem categories
- `problems`: Individual problems
- `testCases`: Test cases for problems
- `submissions`: User code submissions
- `testResults`: Results of test case execution
- `userProblemStatus`: User progress tracking
- `solutions`: Official solutions (optional)

## Next Steps

1. **Code Execution Service**: Integrate with a real code execution service
2. **Rate Limiting**: Implement submission rate limiting
3. **Caching**: Add Redis caching for frequently accessed data
4. **Analytics**: Track user progress and problem statistics
5. **Leaderboards**: Implement user rankings and achievements
6. **Discussion**: Add problem discussion/comments feature
7. **Hints**: Add progressive hints for problems
8. **Solutions**: Add official solution explanations
