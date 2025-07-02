const fs = require('fs');
const path = require('path');

// Function to read file content
function readFile(filePath) {
    try {
        return fs.readFileSync(filePath, 'utf8');
    } catch (error) {
        console.error(`Error reading file ${filePath}:`, error.message);
        return '';
    }
}

// Read all the modular files
const sidebar = readFile('includes/sidebar.html');
const navigation = readFile('includes/navigation.html');
const about = readFile('pages/about.html');
const resume = readFile('pages/resume.html');
const portfolio = readFile('pages/portfolio.html');
const blog = readFile('pages/blog.html');
const contact = readFile('pages/contact.html');
const serviceModal = readFile('includes/service-modal.html');

// Create the complete HTML structure
const completeHTML = `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Utkarsh Shukla - Personal Portfolio</title>

  <!--
    - favicon
  -->
  <link rel="shortcut icon" href="./assets/images/logo.ico" type="image/x-icon">

  <!--
    - custom css link
  -->
  <link rel="stylesheet" href="./assets/css/style.css">

  <!--
    - google font link
  -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">

  <!--
    - Custom Style for clickable service items
  -->
  <style>
    .service-item {
      cursor: pointer;
    }
  </style>

</head>

<body>

  <!--
    - #MAIN
  -->

  <main>

    ${sidebar}

    <!--
      - #main-content
    -->

    <div class="main-content">

      ${navigation}

      ${about}

      ${resume}

      ${portfolio}

      ${blog}

      ${contact}

    </div>

  </main>

  ${serviceModal}

  <!--
    - custom js link
  -->
  <script src="./assets/js/script.js"></script>

  <!--
    - ionicon link
  -->
  <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
  <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>

</body>

</html>`;

// Write the complete HTML to index.html
fs.writeFileSync('index.html', completeHTML, 'utf8');
console.log('✅ Build complete! index.html has been generated from modular files.');
console.log('📁 You can still edit individual files in includes/ and pages/ directories.');
console.log('🔄 Run "node build.js" again after making changes to rebuild index.html.'); 