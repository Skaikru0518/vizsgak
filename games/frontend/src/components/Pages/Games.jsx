import { useAuth } from '@/context/authContext';
import { API_PATH } from '@/utils/apiPaths';
import { axiosInstance } from '@/utils/axiosInstance';
import React, { useEffect, useState } from 'react';
import GameCard from '../layouts/GameCard';
import { Button } from '../ui/button';
import AddGameModal from '../layouts/AddGameModal';

const Games = () => {
  const [myGames, setMyGames] = useState([]);
  const { token } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetcMyGames = async () => {
      try {
        const response = await axiosInstance.get(API_PATH.myGames, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMyGames(response.data);
      } catch (error) {
        console.error('Error fetching users game', error);
      }
    };
    fetcMyGames();
  }, []);

  return (
    <div className="flex flex-col mt-5 container items-center justify-center mx-auto">
      <Button
        className="bg-green-500 hover:bg-green-400 hover:transition duration-300 hover:cursor-pointer"
        onClick={() => setModalOpen(true)}
      >
        Add new game
      </Button>
      <AddGameModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <div className="grid grid-cols-3 container mx-auto space-x-5 space-y-5 place-items-center-safe mt-9">
        {myGames.map((game, id) => (
          <GameCard {...game} key={id} />
        ))}
      </div>
    </div>
  );
};

export default Games;
