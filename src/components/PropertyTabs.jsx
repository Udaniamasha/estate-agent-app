import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const PropertyTabs = ({ description, floorPlanImg, mapUrl }) => {
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
              style={{ border: 0 }} 
              loading="lazy" 
              allowFullScreen 
              src={mapUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d317718.69319292053!2d-0.3817765050863085!3d51.528307984912544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon!5e0!3m2!1sen!2suk!4v1644247568294!5m2!1sen!2suk"}
            ></iframe>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default PropertyTabs;