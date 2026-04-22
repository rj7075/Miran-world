def generate_response(query: str):
    query = query.lower()

    shapes = []

    if "triangle" in query:
        triangle_type = "right_angle" if "right" in query else "generic"
        shapes.append({
            "type": "triangle",
            "triangle_type": triangle_type,
            "points": [[0,0],[4,0],[0,3]]
        })

    if "circle" in query:
        shapes.append({
            "type": "circle",
            "center": [1,1],
            "radius": 1,
            "touches": "all_sides" if "touching" in query else None
        })

    return {"shapes": shapes}