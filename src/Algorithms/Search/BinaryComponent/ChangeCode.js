export default function changeCode(
  isLinearSearch,
  setCode,
) {
  let endString = 'BinarySearch';
  if (isLinearSearch) endString = 'LinearSearch';
  switch (endString) {
    case 'BinarySearch':
      setCode(`import collections # Optional line

def BinarySearch(numbers, target):
    low, high = 0, len(numbers)-1

    while low <= high:
        mid = low + (high - low)//2
        if numbers[mid] == target:
            return True
        
        if numbers[mid] < target:
            low = mid + 1
        else:
            high = mid - 1

    return False

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
target = int(input("Enter target: "))
BinarySearch(numbers, target)

        `);
      break;
    case 'LinearSearch':
      setCode(`import collections # Optional line

def LinearSearch(numbers, target):
    for i in range(len(numbers)):
        if numbers[i] == target:
            return True
    
    return False

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
target = int(input("Enter target: "))
LinearSearch(numbers, target)
        
        `);
      break;
    default:
      break;
  }
}
