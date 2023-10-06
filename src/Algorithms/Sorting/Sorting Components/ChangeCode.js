export default function changeCode(
  item,
  ascending,
  setCode,
) {
  switch (item) {
    case 'Quick Sorting':
      setCode(`def partition(array, low, high):
    pivot = array[high]
    i = low - 1
    
    for j in range(low, high):
        if array[j] ${ascending ? '<=' : '>'} pivot:
            i = i + 1
            (array[i], array[j]) = (array[j], array[i])
      
    (array[i + 1], array[high]) = (array[high], array[i + 1])
    
    return i + 1
      
def quickSort(array, low, high):
    if low < high:
        di = partition(array, low, high)
        quickSort(array, low, di - 1)
        quickSort(array, di + 1, high)
    
array = [1, 7, 4, 1, 10, 9, -2]
print("Unsorted Array")
print(array)
    
length = len(array)
    
quickSort(array, 0, length - 1)
    
print('Sorted Array in ${ascending ? 'Ascending' : 'Descending'} Order:')
print(array)
`);
      break;
    case 'Merge Sorting':
      setCode(`def mergeSort(array):
    if len(array) > 1:
        r = len(array)//2
        L = array[:r]
        M = array[r:]
        mergeSort(L)
        mergeSort(M)
        i = j = k = 0
        while i < len(L) and j < len(M):
            if L[i] ${ascending ? '<' : '>'} M[j]:
                array[k] = L[i]
                i += 1
            else:
                array[k] = M[j]
                j += 1
            k += 1
                  
        while i < len(L):
            array[k] = L[i]
            i += 1
            k += 1
      
        while j < len(M):
            array[k] = M[j]
            j += 1
            k += 1
      
array = [1, 7, 4, 1, 10, 9, -2]
mergeSort(array)
print("Sorted Array in ${ascending ? 'Ascending' : 'Descending'} Order: ")
print(array)
`);
      break;
    case 'Selection Sorting':
      setCode(`def selectionSort(array, size):
    for step in range(size):
        min_idx = step
        for i in range(step + 1, size):
  
            if array[i] ${ascending ? '<' : '>'} array[min_idx]:
                min_idx = i
  
        (array[step], array[min_idx]) = (array[min_idx], array[step])
  
array = [1, 7, 4, 1, 10, 9, -2]
size = len(array)
selectionSort(array, size)
print('Sorted Array in ${ascending ? 'Ascending' : 'Descending'} Order:')
print(array)

`);
      break;
    case 'Insertion Sorting':
      setCode(`def insertionSort(array):
    for step in range(1, len(array)):
        key = array[step]
        j = step - 1

        while j >= 0 and key ${ascending ? '<' : '>'} array[j]:
            array[j + 1] = array[j]
            j = j - 1

        array[j + 1] = key
  
array = [1, 7, 4, 1, 10, 9, -2]
insertionSort(array)
print('Sorted Array in ${ascending ? 'Ascending' : 'Descending'} Order:')
print(array)
`);
      break;
    case 'Bubble Sorting':
      setCode(`def bubbleSort(arr):
    n = len(arr)
    swapped = False

    for i in range(n-1):
        for j in range(0, n-i-1):
            if arr[j + 1] ${ascending ? '<' : '>'} arr[j]:
                swapped = True
                arr[j], arr[j + 1] = arr[j + 1], arr[j]

        if not swapped:
            return

arr = [1, 7, 4, 1, 10, 9, -2]
bubbleSort(arr)
print("Sorted Array in ${ascending ? 'Ascending' : 'Descending'} Order:")
print(arr)

`);
      break;

    default:
      break;
  }
}
