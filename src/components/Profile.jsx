import React, { useRef } from "react";

const Profile = ({ profileData }) => {
  const printRef = useRef(); // Ref to the printable area

  if (!profileData) {
    return <div className="profile">No profile selected</div>;
  }

  // Function to trigger print
  const exportToPDF = () => {
   console.log(profileData);
    
    const printContent = printRef.current; // Get the ref content
    const printWindow = window.open("", "_blank"); // Open new window for printing

    console.log(profileData);

    // Write printable HTML content
    printWindow.document.write(`
      <html>
        <head>
          <title>Profile PDF</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
            }
            .profile {
              text-align: center;
            }
            .profile-photo {
              width: 150px;
              height: 150px;
              border-radius: 50%;
              margin-bottom: 20px;
            }
            .profile h2 {
              margin-bottom: 10px;
            }
            .profile p {
              margin: 5px 0;
            }
          </style>
        </head>
        <body>
          ${printContent.innerHTML} <!-- Add the content to the new window -->
        </body>
      </html>
    `);

    printWindow.document.close(); // Close the document stream
    printWindow.print(); // Trigger the print dialog
  };

  return (
    <div>
      <div ref={printRef} className="profile">
        <h2>Profile</h2>
        <img src={profileData.photo} alt={profileData.name} className="profile-photo" />
        <p><strong>Name:</strong> {profileData.name}</p>
        <p><strong>Age:</strong> {profileData.age}</p>
        <p><strong>Admit Date:</strong> {profileData.admitDate}</p>
        <button onClick={exportToPDF} className="export-button">
        Export to PDF
      </button>
      </div>
      {/* Add Export to PDF Button */}
     
    </div>
  );
};

export default Profile;
