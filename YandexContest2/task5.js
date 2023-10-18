function findVasiliysCompanyTime(data) {
    const users = data.users;
    const rooms = data.rooms;
    const vasiliysTime = [];
    const roomGuests = new Array(rooms.length).fill(0);
  
    for (const user of users) {
      const startTime = user[0];
      const endTime = user[1];
  
      let roomIndex = -1;
      for (let i = 0; i < rooms.length; i++) {
        if (roomGuests[i] < 2) {
          roomIndex = i;
          break;
        }
      }
  
      if (roomIndex !== -1) {
        roomGuests[roomIndex]++;
      }
  
      else {
        for (let i = 0; i < rooms.length; i++) {
          if (roomGuests[i] === 1) {
            roomGuests[i]--;
            roomGuests[0]++;
            roomIndex = i;
            break;
          }
        }
      }
  
      if (roomIndex !== -1) {
        vasiliysTime.push([startTime, endTime]);
        roomGuests[roomIndex]++;
      }
    }
  
    return vasiliysTime;
  }
  
  const data = {
    users: [
      [10, 12],
      [13, 17],
      [14, 15]
    ],
    rooms: [2]
  };
  
  const result = findVasiliysCompanyTime(data);
  console.log(result);