import React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Button } from '../ui/button';
import { useLocation } from 'react-router-dom';
import { axiosInstance } from '@/utils/axiosInstance';
import { API_PATH } from '@/utils/apiPaths';
import { toast } from 'sonner';

const GameCard = (props) => {
  const location = useLocation();
  const isGamesPage = location.pathname === '/games';
  const removeGame = async () => {
    try {
      const response = await axiosInstance.delete(
        `${API_PATH.remove}/${props.id}`,
      );
      toast.success('Game Removed');
    } catch (error) {
      toast.error('Could not remove game');
      console.error('Error removing game', error);
    }
  };
  return (
    <Card className="w-80 h-[700px] flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl text-center line-clamp-2 min-h-[3.5rem]">
          {props.name}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col space-y-3 font-semibold flex-grow">
        <div className="flex-shrink-0 h-[400px] overflow-hidden rounded-md">
          <img
            src={props.cover}
            alt={props.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col space-y-2 mt-auto">
          <p className="text-gray-600 text-sm">{props.developer}</p>
          <p className="text-lg font-bold text-green-600">{props.price} HUF</p>
        </div>
      </CardContent>

      {isGamesPage && (
        <CardFooter className="pt-4">
          <Button
            variant="destructive"
            className="w-full"
            onClick={() => removeGame()}
          >
            Remove
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default GameCard;
