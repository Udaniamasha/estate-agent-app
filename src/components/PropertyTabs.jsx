import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import DOMPurify from 'dompurify';

// Displays three tabs: Description, Floor Plan, and Google Map
// This meets the Phase 3 "Tabbed Interface" requirement
const PropertyTabs = ({ description, floorPlanImg, location }) => {

  // Sanitize the description HTML to remove any unsafe tags or scripts
  // This protects against XSS even if the data in JSON came from an external source
  const safeDescription = DOMPurify.sanitize(description);

  // Prepare the location string to be safely used in a Google Maps URL
  const mapQuery = encodeURIComponent(location);

  return (
    <div className="tabs-section">
      {/* React Tabs widget (counts as a React UI component for Phase 3) */}
      <Tabs>
        <TabList>
          <Tab>Description</Tab>
          <Tab>Floor Plan</Tab>
          <Tab>Map</Tab>
        </TabList>

        {/* --- Tab 1: Property Description --- */}
        <TabPanel>
          <div className="tab-content description">
            <h3>Property Description</h3>
            {/* Using dangerouslySetInnerHTML but only after sanitizing content */}
            <p dangerouslySetInnerHTML={{ __html: safeDescription }}></p>
          </div>
        </TabPanel>

        {/* --- Tab 2: Floor Plan --- */}
        <TabPanel>
          <div className="tab-content floorplan">
            <h3>Floor Plan</h3>

            {/* If a floor plan image exists, show it; otherwise display a placeholder message */}
            {floorPlanImg && floorPlanImg.trim() !== '' ? (
              <img src={floorPlanImg} alt="Floor Plan" style={{width: '100%', marginTop: '10px'}} />
            ) : (
              <div
                style={{
                  textAlign: 'center',
                  padding: '20px',
                  color: '#888'
                }}
              >
                <p>No floor plan available for this property.</p>
              </div>
            )}
          </div>
        </TabPanel>

        {/* --- Tab 3: Google Map --- */}
        <TabPanel>
          <div className="tab-content map">
            <h3>Location Map</h3>
            {/* Embedded Google Map centered on the property location */}
            <iframe
              title="Property Location"
              width="100%"
              height="450"
              style={{
                border: 0,
                borderRadius: '8px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
              }}
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
