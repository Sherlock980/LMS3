import React from 'react';

function PlayersAside() {
    return (
        <aside className="col-md-3 cell-aside order-md-1">
          <h3>Player Achievements</h3>
          <div>
            <p>Most Valuable Player: Alex Hawk</p>
            <p>Rookie of the Year: Jamie Snow</p>
            <p>Best Freestyle: Casey Storm</p>
          </div>
      
          <h3>Player Training Camp</h3>
          <div>
            <p>Sharpen your skills and learn from the pros!</p>
            <p>DATE: December 5th - December 9th</p>
            <p>LOCATION: Frosty Peaks Resort</p>
          </div>
        </aside>
      );
      
}

export default PlayersAside;
