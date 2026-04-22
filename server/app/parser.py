def validate_response(data):
    if "shapes" not in data:
        raise ValueError("Missing shapes key")
    return data