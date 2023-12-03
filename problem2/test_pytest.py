from unit_testing_sample_code import string_capitalizer, capitalize_list, integer_manipulator, manipulate_list
import pytest

# Tests for string_capitalizer function
def test_string_capitalizer():
    assert string_capitalizer("two") == "TwO"
    assert string_capitalizer("c") == "C"
    assert string_capitalizer(4) == "FouR"
    assert string_capitalizer("") == ""

# Tests for capitalize_list function
def test_capitalize_list():
    assert capitalize_list(["two", "c", 4, ""]) == ["TwO", "C", "FouR", ""]

# Tests for integer_manipulator function
def test_integer_manipulator():
    assert integer_manipulator(10) == 66
    assert integer_manipulator(2) == 2
    assert integer_manipulator(3) == 6
    assert integer_manipulator(0) == 0
    with pytest.raises(TypeError):
        integer_manipulator("three")

# Tests for manipulate_list function
def test_manipulate_list():
    assert manipulate_list([10, 2, 3, 0, "three"]) == [66, 2, 6, 0, 1]

# Run the tests
if __name__ == '__main__':
    pytest.main()
