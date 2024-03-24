# print("hi i am connected ")
import json

output="hi"
# Example data to return as JSON
data = {
    "message":output
}

# Convert data to JSON format
json_data = json.dumps(data)

# Print the JSON data
print(json_data)

# import json
# import extractingdata

# # Call the 'adira' function from 'extractingdata.py'
# output = extractingdata.adira()

# # Example data to return as JSON
# data = {
#     "message": output
# }

# # Convert data to JSON format
# json_data = json.dumps(data)

# # Print the JSON data
# print(json_data)
