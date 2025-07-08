import React, { useState } from 'react';
import Navbar from './components/navbar1/Navbar';
import Navbar2 from './components/navbar2/navbar2';
import MainContent from './Pages/CompanyUpdates/MainContent';
import Sidebar from './Pages/CompanyUpdates/Sidebar';
import Feedback from './Pages/CompanyUpdates/Feedback';
import MyTerritory from './Pages/myTerritory/myTerritory';
import NewFinancings from './Pages/newFinancing/newFinance';
import SavedSearches from './Pages/savedSearches/savedSearch';

function App() {
  const [activeTab, setActiveTab] = useState("Company Updates");

  const renderContent = () => {
    if (activeTab === "Company Updates") {
      return (
        <div className="main-wrapper">
          <div className="main-container">
            <div className="header-layout">
              <MainContent />
              <Sidebar />
            </div>
            <Feedback />
          </div>
        </div>
      );
    } else if (activeTab === "My Territory") {
      return <MyTerritory />;
    } else if (activeTab === "New PE/VC Financings") {
      return <NewFinancings />;
    } else if (activeTab === "Saved Searches") {
      return <SavedSearches />;
    }
  };

  return (
    <div className="page-wrapper">
      <div className="content-container">
        <Navbar />
        <Navbar2 onTabChange={setActiveTab} />
        {renderContent()}
      </div>
    </div>
  );
}

export default App;




// import React, { useState } from 'react';
// import Navbar from './components/navbar1/Navbar';
// import Navbar2 from './components/navbar2/navbar2';
// import MainContent from './Pages/CompanyUpdates/MainContent';
// import Sidebar from './Pages/CompanyUpdates/Sidebar';
// import Feedback from './Pages/CompanyUpdates/Feedback';
// import MyTerritory from './Pages/myTerritory/myTerritory';
// import NewFinancings from './Pages/newFinancing/newFinance';
// import SavedSearches from './Pages/savedSearches/savedSearch';

// const App = () => {
//   const [activeTab, setActiveTab] = useState("Company Updates");

//   const renderContent = () => {
//     switch (activeTab) {
//       case "Company Updates":
//         return (
//           <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 33px' }}>
//             <MainContent />
//             <Sidebar />
//             <Feedback />
//           </div>
//         );
//       case "My Territory":
//         return <MyTerritory />;
//       case "New PE/VC Financings":
//         return <NewFinancings />;
//       case "Saved Searches":
//         return <SavedSearches />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className='page-wrapper' style={{ width: '1280px', margin: '0 auto' }}>
//       <Navbar />
//       <Navbar2 setActiveTab={setActiveTab} activeTab={activeTab} />
//       {renderContent()}
//     </div>
//   );
// };

// export default App;
