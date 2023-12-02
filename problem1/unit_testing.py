# Import the functions from unit_testing_sample_code.py
from unit_testing_sample_code import string_capitalizer, capitalize_list, integer_manipulator, manipulate_list

def test_string(test_name, expected, actual):
    if expected == actual:
        print(f"Test {test_name} passed! `{expected}` matches `{actual}`.")
    else:
        print(f"Test {test_name} failed. Expected: `{expected}`. Got: `{actual}`.")

def test_strlist(test_name, expected_list, actual_list):
    print(f"Test {test_name}:")
    for i in range(len(expected_list)):
        if expected_list[i] == actual_list[i]:
            print(f"Part {i} in test {test_name} passed! `{expected_list[i]}` matches `{actual_list[i]}`.")
        else:
            print(f"Part {i} in test {test_name} failed. Expected: `{expected_list[i]}`. Got: `{actual_list[i]}`.")

def test_int(test_name, expected, actual):
    if expected == actual:
        print(f"Test {test_name} passed! `{expected}` matches `{actual}`.")
    else:
        print(f"Test {test_name} failed. Expected: `{expected}`. Got: `{actual}`.")

def test_intlist(test_name, expected_list, actual_list):
    print(f"Test {test_name}:")
    for i in range(len(expected_list)):
        if expected_list[i] == actual_list[i]:
            print(f"Part {i} in test {test_name} passed! `{expected_list[i]}` matches `{actual_list[i]}`.")
        else:
            print(f"Part {i} in test {test_name} failed. Expected: `{expected_list[i]}`. Got: `{actual_list[i]}`.")

# Testing the functions
print("\nString Capitalizer Tests:")
test_string("0", "TwO", string_capitalizer("two"))
test_string("1", "C", string_capitalizer("c"))
test_string("2", "FouR", string_capitalizer("4"))
test_string("3", "", string_capitalizer(""))

print("\nList Capitalizer Tests:")
test_strlist("0", ["TwO","C","FouR",""], capitalize_list(["two","c",4,""]))

print("\nInteger Manipulator Tests:")
test_int("0", 66, integer_manipulator(10))
test_int("1", 2, integer_manipulator(2))
test_int("2", 6, integer_manipulator(3))
test_int("3", 0, integer_manipulator(0))
test_int("4", 1, integer_manipulator("three"))

print("\nManipulate List Tests:")
test_intlist("0", [66,2,6,0,1], manipulate_list([10,2,3,0,"three"]))
