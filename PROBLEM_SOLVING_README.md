# Problem Solving Platform Backend

A comprehensive backend API for a LeetCode/AlgoExpert-style problem-solving platform built with Next.js, Prisma, and MongoDB.

## 🚀 Features

### Core Functionality

- **Topics Management**: Organize problems by categories (Algorithms, Data Structures, etc.)
- **Problem Management**: Full CRUD operations for coding problems
- **Code Submissions**: Submit and execute code solutions
- **Test Cases**: Manage problem test cases with hidden/public visibility
- **User Progress Tracking**: Track user problem-solving status and statistics
- **Filtering & Search**: Advanced filtering by difficulty, tags, company, etc.

### Technical Features

- **RESTful API**: Clean, consistent API design
- **Authentication**: NextAuth integration with role-based access
- **Database**: MongoDB with Prisma ORM
- **Code Execution**: Simulated code execution (ready for real integration)
- **Pagination**: Efficient data pagination
- **Error Handling**: Comprehensive error responses

## 📁 Project Structure

```
src/
├── app/api/v1/
│   ├── topics/
│   │   ├── route.ts                    # Topics CRUD
│   │   └── [topicId]/
│   │       └── route.ts                # Individual topic operations
│   ├── problems/
│   │   ├── route.ts                    # Problems CRUD
│   │   └── [problemId]/
│   │       ├── route.ts                # Individual problem operations
│   │       └── test-cases/
│   │           └── route.ts            # Test cases management
│   └── submissions/
│       └── route.ts                    # Code submissions
├── scripts/
│   └── seed-problem-data.ts            # Database seeder
└── prisma/
    └── schema.prisma                   # Database schema
```

## 🗄️ Database Schema

### Core Models

#### Topic

```prisma
model Topic {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  name        String   @unique
  slug        String   @unique
  description String?
  difficulty  TopicDifficulty
  type        TopicType
  problemCount Int     @default(0)
  tags        String[]
  isActive    Boolean  @default(true)
  order       Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  problems Problem[]
}
```

#### Problem

```prisma
model Problem {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  topicId     String   @map("topic_id")
  title       String
  slug        String   @unique
  description String
  difficulty  ProblemDifficulty
  tags        String[]
  companyTags String[] @map("company_tags")
  timeLimit   Int      @default(3000)
  memoryLimit Int      @default(256)
  successRate Float    @default(0)
  score       Int      @default(0)
  isActive    Boolean  @default(true)
  order       Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  topic           Topic              @relation(fields: [topicId], references: [id], onDelete: Cascade)
  submissions     Submission[]
  testCases       TestCase[]
  solutions       Solution[]
  userStatuses    UserProblemStatus[]
}
```

#### Submission

```prisma
model Submission {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  userId    String   @map("user_id")
  problemId String   @map("problem_id")
  language  String
  code      String
  status    SubmissionStatus
  runtime   Int?
  memory    Int?
  score     Int?
  error     String?
  submittedAt DateTime @default(now())

  user    User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  problem Problem @relation(fields: [problemId], references: [id], onDelete: Cascade)
  testResults TestResult[]
}
```

## 🛠️ Setup & Installation

### Prerequisites

- Node.js 18+
- MongoDB database
- Next.js project setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Add to your `.env` file:

```env
DATABASE_URL="mongodb://localhost:27017/problem-solving-platform"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed initial data
npm run seed
```

### 4. Start Development Server

```bash
npm run dev
```

## 📚 API Usage

### Topics

#### List Topics

```bash
GET /api/v1/topics?page=1&limit=10&difficulty=INTERMEDIATE
```

#### Create Topic (Admin)

```bash
POST /api/v1/topics
Content-Type: application/json

{
  "name": "New Topic",
  "description": "Topic description",
  "difficulty": "BEGINNER",
  "type": "CORE_CS",
  "tags": ["Architecture"],
  "order": 1
}
```

### Problems

#### List Problems

```bash
GET /api/v1/problems?topicId=123&difficulty=EASY&status=UNSOLVED
```

#### Get Problem Details

```bash
GET /api/v1/problems/{problemId}
```

#### Submit Solution

```bash
POST /api/v1/submissions
Content-Type: application/json

{
  "problemId": "problem_id",
  "language": "python",
  "code": "def solution(nums, target):\n    return [0, 1]"
}
```

## 🔧 Code Execution Integration

The current implementation includes a simulation of code execution. To integrate with a real code execution service:

### Option 1: Docker-based Execution

```typescript
// Example integration with Docker
async function executeCode(code: string, language: string, testCases: TestCase[]) {
    const container = await docker.createContainer({
        Image: `${language}-runner`,
        Cmd: ['node', 'runner.js'],
        Env: [`CODE=${code}`, `TEST_CASES=${JSON.stringify(testCases)}`],
        // ... security configurations
    });

    // Execute and return results
}
```

### Option 2: Cloud Services

- **AWS Lambda**: Serverless code execution
- **Google Cloud Functions**: Scalable execution
- **Judge0**: Specialized online judge API

### Option 3: Specialized Platforms

- **Sphere Engine**: Professional online judge
- **HackerRank API**: External evaluation service

## 🔒 Security Considerations

### Code Execution Security

1. **Sandboxing**: Run code in isolated containers
2. **Resource Limits**: Enforce time and memory limits
3. **Network Isolation**: Prevent network access
4. **File System**: Read-only file system access

### API Security

1. **Rate Limiting**: Implement submission rate limits
2. **Input Validation**: Validate all user inputs
3. **Authentication**: Require authentication for all endpoints
4. **Authorization**: Role-based access control

## 📊 Monitoring & Analytics

### Key Metrics to Track

- Submission success rates
- Problem difficulty distribution
- User engagement patterns
- Code execution performance
- Error rates and types

### Implementation

```typescript
// Example analytics tracking
async function trackSubmission(submission: Submission) {
    await analytics.track('code_submitted', {
        problemId: submission.problemId,
        language: submission.language,
        status: submission.status,
        runtime: submission.runtime,
        memory: submission.memory,
    });
}
```

## 🚀 Deployment

### Production Setup

1. **Database**: Use MongoDB Atlas or self-hosted MongoDB
2. **Environment**: Deploy to Vercel, Netlify, or custom server
3. **Code Execution**: Set up dedicated execution infrastructure
4. **Monitoring**: Implement logging and monitoring

### Environment Variables (Production)

```env
DATABASE_URL="mongodb+srv://user:pass@cluster.mongodb.net/db"
NEXTAUTH_SECRET="production-secret-key"
NEXTAUTH_URL="https://yourdomain.com"
CODE_EXECUTION_URL="https://your-execution-service.com"
```

## 🧪 Testing

### API Testing

```bash
# Test topics endpoint
curl -X GET "http://localhost:3000/api/v1/topics"

# Test problem submission
curl -X POST "http://localhost:3000/api/v1/submissions" \
  -H "Content-Type: application/json" \
  -d '{"problemId":"123","language":"python","code":"print(1)"}'
```

### Database Testing

```bash
# Reset database
npx prisma db push --force-reset

# Seed test data
npm run seed
```

## 🔄 Future Enhancements

### Planned Features

1. **Real-time Code Execution**: WebSocket-based execution updates
2. **Code Editor Integration**: Monaco Editor or CodeMirror
3. **Discussion System**: Problem comments and solutions
4. **Leaderboards**: User rankings and achievements
5. **Progressive Hints**: Multi-level problem hints
6. **Solution Explanations**: Detailed solution walkthroughs
7. **Practice Sessions**: Timed practice modes
8. **Company-specific Problems**: Curated problem sets

### Technical Improvements

1. **Caching**: Redis for frequently accessed data
2. **CDN**: Static asset delivery optimization
3. **Microservices**: Split into specialized services
4. **GraphQL**: Alternative to REST API
5. **Real-time Features**: WebSocket integration

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For questions and support:

- Create an issue in the repository
- Check the API documentation
- Review the troubleshooting guide

---

**Happy Coding! 🎉**
