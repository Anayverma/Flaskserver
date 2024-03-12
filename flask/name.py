# print("hi i am connected ")
import json

# Example data to return as JSON
data = {
    "message": " am connected"
}

# Convert data to JSON format
json_data = json.dumps(data)

# Print the JSON data
print(json_data)
