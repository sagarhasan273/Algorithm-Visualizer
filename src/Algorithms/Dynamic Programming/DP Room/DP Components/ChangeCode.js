export default function changeCode(
  index,
  end,
  isRecursionActive,
  isTabulationActive,
  items,
  setCode,
) {
  let endString = end;
  if (isRecursionActive && end === '') endString = 'Recursion';
  if (isTabulationActive && end === '') endString = 'Tabulation';
  switch (`${items[index]}${endString}`) {
    case 'Fibonacci':
      setCode(`import collections # Optional line

def fibonacci(n):
    if n == 0 or n == 1:
        return n

    return fibonacci(n-1) + fibonacci(n-2)

number = int(input("Enter Number: "))
fibonacci(number)
        
        `);
      break;
    case 'FibonacciRecursion':
      setCode(`import collections # Optional line

def fibonacciRecursion(n):
    if n == 0 or n == 1:
        return n

    return fibonacciRecursion(n-1) + fibonacciRecursion(n-2)

number = int(input("Enter Number: "))
fibonacciRecursion(number)
        
        `);
      break;
    case 'FibonacciTabulation':
      setCode(`import collections # Optional line

def fibonacciTabulation(n):
    if n == 0 or n == 1:
        return n
    dp = [0, 1] + [0]*(n-1)
    for i in range(2, n+1):
        dp[i] = dp[i-1] + dp[i-2]

    return dp[n]

number = int(input("Enter Number: "))
fibonacciTabulation(number)
        
        `);
      break;
    case '0-1Knapsack':
      setCode(`import collections # Optional line

def Knapsack(i, s):
    if i == n:
        return 0
    if s < 0:
        return -inf

    return max(Knapsack(i+1, s), profits[i] + Knapsack(i+1, s - weights[i]))

Knapsack(0, int(input("Enter Bag Capacity: ")))
        
        `);
      break;
    case '0-1KnapsackRecursion':
      setCode(`def KnapsackRecursion(i, s):
    if i == n:
        return 0
    if s < 0:
        return -inf

    return max(KnapsackRecursion(i+1, s), profits[i] + KnapsackRecursion(i+1, s - weights[i]))

n = 4
W = int(input("Enter Bag Capacity: "))
profits = [50, 70, 20, 28]
weigths = [4, 7, 2, 8]
answer = KnapsackRecursion(i, W)
print(answer)
`);
      break;
    case '0-1KnapsackTabulation':
      setCode(`def KnapsackTabulation(n):

    dp = [[0 for x in range(W + 1)] for x in range(n + 1)]

    # Build table dp[][] in bottom up manner
    for i in range(n + 1):
        for w in range(W + 1):
            if i == 0 or w == 0:
                dp[i][w] = 0
            elif wt[i-1] <= w:
                dp[i][w] = max(val[i-1]
                              + dp[i-1][w-wt[i-1]],
                              dp[i-1][w])
            else:
                dp[i][w] = dp[i-1][w]

    return K[n][W]

W = int(input("Enter Bag Capacity: "))
n = len(profit)
profits = [50, 70, 20, 28]
weigths = [4, 7, 2, 8]
print(knapSackTabulation(W, weights, profits, n))

`);
      break;
    default:
      break;
  }
}
