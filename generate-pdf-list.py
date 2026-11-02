import os
import json

# Website root directory
WEBSITE_ROOT = r"C:\GithubProfile\ericmichharrison.github.io"

# Project directory to scan
ROOT = os.path.join(
    WEBSITE_ROOT,
    "assets",
    "pages",
    "projects"
)

# Output JSON file
OUTPUT = os.path.join(WEBSITE_ROOT, "pdf-list.json")

pdf_groups = {}

for current_dir, directories, files in os.walk(ROOT):

    directories.sort()

    for filename in sorted(files):

        if filename.lower().endswith(".pdf"):

            full_path = os.path.join(current_dir, filename)

            # Get path relative to the website root
            relative_path = os.path.relpath(
                full_path,
                WEBSITE_ROOT
            )

            # Convert Windows paths to website paths
            web_path = "/" + relative_path.replace(os.sep, "/")

            # Get directory structure
            relative_dir = os.path.relpath(
                current_dir,
                ROOT
            )

            parts = relative_dir.split(os.sep)

            # First directory = project name
            project = parts[0]

            # Last directory = category
            category = os.path.basename(current_dir)

            # Create project/category structure
            pdf_groups.setdefault(project, {})
            pdf_groups[project].setdefault(category, [])

            pdf_groups[project][category].append({
                "name": filename,
                "path": web_path
            })

# Generate JSON
with open(OUTPUT, "w", encoding="utf-8") as f:
    json.dump(pdf_groups, f, indent=4)

print("PDF library generated successfully!")
print(f"Projects found: {len(pdf_groups)}")
print(f"Output: {OUTPUT}")
