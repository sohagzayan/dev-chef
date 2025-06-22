// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const certificationQuestions: { [key: string]: any[] } = {
    'problem-solving-basic': [
        {
            question: 'What is the time complexity of binary search?',
            options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
            correctAnswer: 1,
        },
        {
            question: 'Which data structure uses LIFO (Last In, First Out) principle?',
            options: ['Queue', 'Stack', 'Array', 'Linked List'],
            correctAnswer: 1,
        },
        {
            question: 'What is the worst-case time complexity of quicksort?',
            options: ['O(n log n)', 'O(n²)', 'O(n)', 'O(log n)'],
            correctAnswer: 1,
        },
        {
            question: 'Which algorithm is used to find the shortest path in a weighted graph?',
            options: ['BFS', 'DFS', "Dijkstra's", 'Binary Search'],
            correctAnswer: 2,
        },
        {
            question: 'What is the space complexity of merge sort?',
            options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
            correctAnswer: 2,
        },
        {
            question: 'Which data structure is best for implementing a priority queue?',
            options: ['Array', 'Linked List', 'Heap', 'Stack'],
            correctAnswer: 2,
        },
        {
            question:
                'What is the time complexity of inserting an element at the beginning of an array?',
            options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
            correctAnswer: 2,
        },
        {
            question: 'Which sorting algorithm is stable?',
            options: ['Quick Sort', 'Heap Sort', 'Merge Sort', 'Selection Sort'],
            correctAnswer: 2,
        },
        {
            question: "What is the maximum number of nodes at level 'l' of a binary tree?",
            options: ['2^l', '2^(l-1)', '2^(l+1)', 'l²'],
            correctAnswer: 0,
        },
        {
            question: 'Which traversal method is used to copy a tree?',
            options: ['Inorder', 'Preorder', 'Postorder', 'Level order'],
            correctAnswer: 1,
        },
        {
            question: 'What is the time complexity of searching in a hash table (average case)?',
            options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
            correctAnswer: 0,
        },
        {
            question: 'Which algorithm technique is used in dynamic programming?',
            options: ['Divide and Conquer', 'Greedy', 'Memoization', 'Backtracking'],
            correctAnswer: 2,
        },
        {
            question:
                'What is the minimum number of comparisons required to find the maximum and minimum of n numbers?',
            options: ['n', '2n-2', '3n/2-2', 'n²'],
            correctAnswer: 2,
        },
        {
            question: 'Which data structure is used for implementing recursion?',
            options: ['Queue', 'Stack', 'Array', 'Tree'],
            correctAnswer: 1,
        },
        {
            question: 'What is the time complexity of the Euclidean algorithm for finding GCD?',
            options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
            correctAnswer: 1,
        },
    ],
    'python-basic': [
        {
            question: 'Which of the following is the correct way to create a list in Python?',
            options: ['list = []', 'list = ()', 'list = {}', 'All of the above'],
            correctAnswer: 0,
        },
        {
            question: 'What is the output of print(type([]))?',
            options: ["<class 'list'>", "<class 'array'>", "<class 'tuple'>", "<class 'dict'>"],
            correctAnswer: 0,
        },
        {
            question: 'Which method is used to add an element to the end of a list?',
            options: ['add()', 'append()', 'insert()', 'extend()'],
            correctAnswer: 1,
        },
        {
            question: 'What is the correct way to create a dictionary in Python?',
            options: ['dict = []', 'dict = ()', 'dict = {}', 'dict = <>'],
            correctAnswer: 2,
        },
        {
            question: 'Which of the following is used to define a function in Python?',
            options: ['function', 'def', 'define', 'func'],
            correctAnswer: 1,
        },
        {
            question: 'What is the output of print(2 ** 3)?',
            options: ['6', '8', '9', '5'],
            correctAnswer: 1,
        },
        {
            question: 'Which operator is used for floor division in Python?',
            options: ['/', '//', '%', '**'],
            correctAnswer: 1,
        },
        {
            question: 'What is the correct way to create a tuple with one element?',
            options: ['(1)', '(1,)', '[1]', '{1}'],
            correctAnswer: 1,
        },
        {
            question: 'Which method is used to remove an element from a list by value?',
            options: ['delete()', 'remove()', 'pop()', 'discard()'],
            correctAnswer: 1,
        },
        {
            question: "What is the output of print(len('Hello'))?",
            options: ['4', '5', '6', 'Error'],
            correctAnswer: 1,
        },
        {
            question: 'Which keyword is used to create a class in Python?',
            options: ['class', 'Class', 'define', 'def'],
            correctAnswer: 0,
        },
        {
            question: 'What is the correct way to import a module in Python?',
            options: ['include module', 'import module', 'using module', 'require module'],
            correctAnswer: 1,
        },
        {
            question: 'Which method is used to convert a string to lowercase?',
            options: ['lower()', 'lowercase()', 'toLower()', 'downcase()'],
            correctAnswer: 0,
        },
        {
            question: 'What is the output of print(bool([]))?',
            options: ['True', 'False', 'None', 'Error'],
            correctAnswer: 1,
        },
        {
            question: 'Which loop is used to iterate over a sequence in Python?',
            options: ['while', 'for', 'do-while', 'repeat'],
            correctAnswer: 1,
        },
    ],
    'java-intermediate': [
        {
            question: 'Which of the following is not a Java feature?',
            options: ['Object-oriented', 'Use of pointers', 'Portable', 'Dynamic and Extensible'],
            correctAnswer: 1,
        },
        {
            question: 'What is the size of int in Java?',
            options: ['16 bit', '32 bit', '64 bit', 'Depends on platform'],
            correctAnswer: 1,
        },
        {
            question: 'Which method is called when an object is created?',
            options: ['main()', 'constructor', 'finalize()', 'init()'],
            correctAnswer: 1,
        },
        {
            question: 'What is the default value of boolean variable?',
            options: ['true', 'false', '0', 'null'],
            correctAnswer: 1,
        },
        {
            question: 'Which keyword is used to inherit a class in Java?',
            options: ['extends', 'implements', 'inherits', 'super'],
            correctAnswer: 0,
        },
        {
            question: 'What is method overloading?',
            options: [
                'Same method name with different parameters',
                'Same method name with same parameters',
                'Different method names',
                'None of the above',
            ],
            correctAnswer: 0,
        },
        {
            question: 'Which collection class allows duplicate elements?',
            options: ['Set', 'List', 'Map', 'None'],
            correctAnswer: 1,
        },
        {
            question: 'What is the parent class of all classes in Java?',
            options: ['String', 'Class', 'Object', 'System'],
            correctAnswer: 2,
        },
        {
            question: 'Which keyword is used to prevent inheritance?',
            options: ['final', 'static', 'abstract', 'private'],
            correctAnswer: 0,
        },
        {
            question: 'What is the difference between == and equals()?',
            options: [
                'No difference',
                '== compares references, equals() compares content',
                '== compares content, equals() compares references',
                'Both compare content',
            ],
            correctAnswer: 1,
        },
        {
            question: 'Which interface is implemented by all collections?',
            options: ['Collection', 'List', 'Set', 'Map'],
            correctAnswer: 0,
        },
        {
            question: 'What is autoboxing in Java?',
            options: [
                'Automatic conversion of primitive to wrapper',
                'Automatic conversion of wrapper to primitive',
                'Both',
                'None',
            ],
            correctAnswer: 0,
        },
        {
            question: 'Which keyword is used to handle exceptions?',
            options: ['try', 'catch', 'finally', 'All of the above'],
            correctAnswer: 3,
        },
        {
            question: 'What is the use of synchronized keyword?',
            options: [
                'Thread safety',
                'Memory management',
                'Performance optimization',
                'Error handling',
            ],
            correctAnswer: 0,
        },
        {
            question: 'Which method is used to start a thread?',
            options: ['run()', 'start()', 'execute()', 'begin()'],
            correctAnswer: 1,
        },
        {
            question: 'What is a lambda expression?',
            options: ['Anonymous function', 'Named function', 'Class method', 'Interface method'],
            correctAnswer: 0,
        },
        {
            question: 'Which annotation is used to override a method?',
            options: ['@Override', '@Overload', '@Super', '@Method'],
            correctAnswer: 0,
        },
        {
            question: 'What is the use of static keyword?',
            options: ['Class-level access', 'Instance-level access', 'Both', 'None'],
            correctAnswer: 0,
        },
        {
            question: 'Which design pattern ensures only one instance of a class?',
            options: ['Factory', 'Singleton', 'Observer', 'Strategy'],
            correctAnswer: 1,
        },
        {
            question: 'What is the difference between abstract class and interface?',
            options: [
                'Abstract class can have concrete methods',
                'Interface can have concrete methods',
                'No difference',
                'Both can have constructors',
            ],
            correctAnswer: 0,
        },
    ],
    'sql-advanced': [
        {
            question: 'Which SQL clause is used to filter records?',
            options: ['WHERE', 'FILTER', 'SELECT', 'HAVING'],
            correctAnswer: 0,
        },
        {
            question: 'What is the difference between INNER JOIN and LEFT JOIN?',
            options: [
                'No difference',
                'INNER JOIN returns all records from left table',
                'LEFT JOIN returns all records from left table',
                'INNER JOIN is faster',
            ],
            correctAnswer: 2,
        },
        {
            question: 'Which function is used to count the number of rows?',
            options: ['COUNT()', 'SUM()', 'TOTAL()', 'NUM()'],
            correctAnswer: 0,
        },
        {
            question: 'What is a primary key?',
            options: [
                'Unique identifier for a record',
                'Foreign key reference',
                'Index on a table',
                'Constraint type',
            ],
            correctAnswer: 0,
        },
        {
            question: 'Which clause is used with aggregate functions?',
            options: ['WHERE', 'HAVING', 'GROUP BY', 'ORDER BY'],
            correctAnswer: 1,
        },
        {
            question: 'What is normalization?',
            options: [
                'Process of organizing data',
                'Process of indexing',
                'Process of backing up',
                'Process of querying',
            ],
            correctAnswer: 0,
        },
        {
            question: 'Which SQL command is used to create a table?',
            options: ['CREATE TABLE', 'MAKE TABLE', 'NEW TABLE', 'BUILD TABLE'],
            correctAnswer: 0,
        },
        {
            question: 'What is a subquery?',
            options: [
                'Query within another query',
                'Query on multiple tables',
                'Query with joins',
                'Query with functions',
            ],
            correctAnswer: 0,
        },
        {
            question: 'Which constraint ensures unique values?',
            options: ['PRIMARY KEY', 'UNIQUE', 'CHECK', 'Both A and B'],
            correctAnswer: 3,
        },
        {
            question: 'What is the purpose of INDEX?',
            options: ['Faster data retrieval', 'Data validation', 'Data backup', 'Data encryption'],
            correctAnswer: 0,
        },
        {
            question: 'Which SQL function returns the current date?',
            options: ['NOW()', 'CURRENT_DATE', 'TODAY()', 'Both A and B'],
            correctAnswer: 3,
        },
        {
            question: 'What is a stored procedure?',
            options: ['Precompiled SQL code', 'Database backup', 'Table structure', 'Index type'],
            correctAnswer: 0,
        },
        {
            question: 'Which clause is used to sort results?',
            options: ['SORT BY', 'ORDER BY', 'ARRANGE BY', 'GROUP BY'],
            correctAnswer: 1,
        },
        {
            question: 'What is ACID in database?',
            options: [
                'Atomicity, Consistency, Isolation, Durability',
                'Access, Control, Index, Data',
                'Add, Create, Insert, Delete',
                'None of the above',
            ],
            correctAnswer: 0,
        },
        {
            question: 'Which join returns all records from both tables?',
            options: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL OUTER JOIN'],
            correctAnswer: 3,
        },
        {
            question: 'What is a trigger?',
            options: [
                'Special stored procedure',
                'Table constraint',
                'Index type',
                'Query optimizer',
            ],
            correctAnswer: 0,
        },
        {
            question: 'Which command is used to modify table structure?',
            options: ['UPDATE', 'ALTER', 'MODIFY', 'CHANGE'],
            correctAnswer: 1,
        },
        {
            question: 'What is the difference between DELETE and TRUNCATE?',
            options: [
                'No difference',
                'DELETE can be rolled back',
                'TRUNCATE is faster',
                'Both B and C',
            ],
            correctAnswer: 3,
        },
    ],
};
