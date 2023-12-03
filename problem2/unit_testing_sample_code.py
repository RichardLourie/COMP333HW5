# COMP 333 Software Engineering
# Wesleyan University
# Alex Kaplan (akaplan01@wesleyan.edu) and Sebastian Zimmeck (szimmeck@wesleyan.edu)

"""
Capitalizes the first and last character of a string.
"""
def string_capitalizer(tobecapitalized):
    if tobecapitalized == "":
        return tobecapitalized
    i = 0
    try:
        tbclist = [*tobecapitalized]
        while i < (len(tbclist)):
            if i == 0 or i == (len(tbclist) - 1):
                tbclist[i] = tbclist[i].upper()
            i = i + 1
        tobecapitalized = ''.join(tbclist)
        return tobecapitalized
    except:
        # If failure, return the input as is.
        return tobecapitalized

"""
Capitalizes the first and last character of a string in a list of strings.
"""
def capitalize_list(slist):
    i = 0
    while i < len(slist):
        current_string = slist[i]
        slist[i] = string_capitalizer(current_string)
        i = i + 1
    return slist

"""
Squares, doubles, and then floor divides (by 3) an integer, in that order.
"""
def integer_manipulator(n):
    try:
        n = ((n*n)*2)//3
        return n
    except:
        # If failure, return the input as is.
        return n

"""
Squares, doubles, and then floor divides (by 3) an integer, in that order, in a
list of integers.
"""
def manipulate_list(intlist):
    i = 0
    while i < len(intlist):
        intlist[i] = integer_manipulator(intlist[i])
        i = i + 1
    return intlist

# Sample function calls. Comment in to run.
# print(string_capitalizer("hello"))
# print(capitalize_list(["hello","good","bye"]))
# print(integer_manipulator(7))
# print(manipulate_list([7,8]))