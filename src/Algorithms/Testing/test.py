import inspect


def current_line():
    frame = inspect.currentframe()
    line = frame.f_lineno
    print(f"Currently executing line {line}")

def some_function():
    current_line()
    print("This is some_function")

current_line()
some_function()
