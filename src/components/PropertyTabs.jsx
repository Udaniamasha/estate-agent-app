import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const PropertyTabs = ({ description, floorPlanImg, location}) => {
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
            <p dangerouslySetInnerHTML={{ __html: description }}></p>
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
              title="Google Map"
              width="100%" 
              height="400" 
              style={{ border: 0, borderRadius: '8px' }} 
              loading="lazy" 
              allowFullScreen 
              // Uses the location to find the map area
              src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${mapQuery}`}
            ></iframe>
            {/* NOTE: Without a real API Key, the above might show an error or "Development Mode". 
                For university coursework without an API key, use the standard embed output with the query: */}
            <iframe 
               width="100%" 
               height="400" 
               style={{ border: 0 }}
               src={`https://maps.google.com/maps?q=${mapQuery}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
            ></iframe>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default PropertyTabs;