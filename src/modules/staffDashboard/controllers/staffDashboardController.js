exports.getDashboardData = async (req, res) => {
    try {
      // Mock dashboard data (later you will fetch real data from DB)
      const dashboardData = {
        todaysActivity: 'Some activities for today...',
        salesLead: 10,  // Just mock data for now
        newLead: 5,
        followUpLead: 3,
        meetingAndDemo: 2,
        costingAndProposal: 4,
        projectionLead: 7,
        winsAsProject: 3,
        lostLead: 1,
        junkLead: 2
      };
  
      res.status(200).json({ dashboardData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching dashboard data' });
    }
  };
  