import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import DOMPurify from 'dompurify';

const PropertyTabs = ({ description, floorPlanImg, location}) => {

  // Sanitize the HTML string to remove any malicious scripts
  const safeDescription = DOMPurify.sanitize(description);

  // Create a search query safe for URLs
  const mapQuery = encodeURIComponent(location); 
  return (
    <div className="tabs-section">
      <Tabs>
        <TabList>
          <Tab>Description</Tab>
          <Tab>Floor Plan</Tab>
          <Tab>Map</Tab>
        </TabList>

        <TabPanel>
          <div className="tab-content description">
            <h3>Property Description</h3>
            <p dangerouslySetInnerHTML={{ __html: safeDescription }}></p>
          </div>
        </TabPanel>

         <TabPanel>
          <div className="tab-content floorplan">
            <h3>Floor Plan</h3>
            {/* Logic: If floorPlanImg exists, show it. If not, show placeholder. */}
            {floorPlanImg ? (
               <img src={`/${floorPlanImg}`} alt="Floor Plan" style={{width: '100%', marginTop: '10px'}} />
            ) : (
               <div style={{textAlign: 'center', padding: '20px', color: '#888'}}>
                 <p>No floor plan available for this property.</p>
               </div>
            )}
          </div>
        </TabPanel>
        

        <TabPanel>
          <div className="tab-content map">
            <h3>Location Map</h3>
            <iframe 
               title="Property Location"
               width="100%" 
               height="450" 
               style={{ border: 0, borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
               loading="lazy"
               allowFullScreen
               src={`https://maps.google.com/maps?q=${mapQuery}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
            ></iframe>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default PropertyTabs;