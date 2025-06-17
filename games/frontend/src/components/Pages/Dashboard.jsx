import React, { useEffect, useState } from 'react';
import GameCard from '../layouts/GameCard';
import { axiosInstance } from '@/utils/axiosInstance';
import { API_PATH } from '@/utils/apiPaths';

const Dashboard = () => {
  const [allGames, setAllGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axiosInstance.get(API_PATH.games);
        setAllGames(response.data);
        //console.log(response.data);
      } catch (error) {
        console.error('Error fetching games', error);
      }
    };
    fetchGames();
  }, []);

  return (
    <div className="grid grid-cols-3 container mx-auto space-y-4 place-items-center-safe mt-9">
      {allGames.map((game, id) => (
        <GameCard {...game} key={id} />
      ))}
    </div>
  );
};

export default Dashboard;
