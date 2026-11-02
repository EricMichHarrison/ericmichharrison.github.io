
import os
import json
from pathlib import Path

# Website root directory (works on Windows and Linux)
WEBSITE_ROOT = Path(__file__).resolve().parent

# Project directory to scan
ROOT = WEBSITE_ROOT / "assets" / "pages" / "projects"

# Output JSON file
OUTPUT = WEBSITE_ROOT / "pdf-list.json"

pdf_groups = {}

if not ROOT.exists():
    raise FileNotFoundError(f"Projects directory not found: {ROOT}")

for current_dir, directories, files in os.walk(ROOT):
    directories.sort()

    for filename in sorted(files):
        if filename.lower().endswith(".pdf"):
            full_path = Path(current_dir) / filename

            # Get path relative to website root
            relative_path = full_path.relative_to(WEBSITE_ROOT)

            # Convert to website URL
            web_path = "/" + relative_path.as_posix()

            # Get directory structure
            relative_dir = Path(current_dir).relative_to(ROOT)
            parts = relative_dir.parts

            # First directory = project name
            if not parts:
                continue

            project = parts[0]

            # Last directory = category
            category = Path(current_dir).name

            pdf_groups.setdefault(project, {})
            pdf_groups[project].setdefault(category, [])

            pdf_groups[project][category].append({
                "name": filename,
                "path": web_path
            })

# Generate JSON
with OUTPUT.open("w", encoding="utf-8") as f:
    json.dump(pdf_groups, f, indent=4)

print("PDF library generated successfully!")
print(f"Projects found: {len(pdf_groups)}")
print(f"PDFs found: {sum(len(files) for cats in pdf_groups.values() for files in cats.values())}")
print(f"Output: {OUTPUT}")
