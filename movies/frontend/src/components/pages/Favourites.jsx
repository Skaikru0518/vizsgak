import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import axiosInstance from '@/utils/axiosInstance';
import { API_PATH } from '@/utils/apiPaths';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Button } from '../ui/button';
import { toast } from 'sonner';

const Favourites = () => {
  const { isLoggedIn } = useAuth();
  const [favourites, setFavourites] = useState([]);
  useEffect(() => {
    const getFavourites = async () => {
      const username = localStorage.getItem('userName');
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('accessToken');
      try {
        const response = await axiosInstance.get(API_PATH.getFavourite, {
          params: {
            userId: userId,
            username: username,
            token: token,
          },
        });
        const uniqueFavourites = [];
        const movieIds = new Set();

        if (uniqueFavourites.length < 0) {
          setFavourites([]);
        } else {
          response.data.forEach((movie) => {
            if (!movieIds.has(movie.id)) {
              movieIds.add(movie.id);
              uniqueFavourites.push(movie);
            }
          });
        }

        //console.log(uniqueFavourites);
        setFavourites(uniqueFavourites);
      } catch (error) {
        console.error('Error fetching your favourite movies', error);
      }
    };
    getFavourites();
  }, []);

  const removeFavourite = async (id) => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('accessToken');
    const username = localStorage.getItem('userName');
    try {
      const response = await axiosInstance.delete(
        `${API_PATH.deleteFavourite}/${id}`,
        { params: { username: username, userId: userId, token: token } },
      );

      if (response.status === 200) {
        toast.success('Successfully removed');
        setFavourites((prevFavourites) =>
          prevFavourites.filter((movie) => movie.id !== id),
        );
      }
    } catch (error) {
      console.error('Error deleting favourite moive', error);
    }
  };
  return (
    <>
      {isLoggedIn ? (
        <div className="flex justify-center w-full ">
          <div className="container flex flex-col text-center  space-y-12">
            <h1 className="text-3xl font-semibold mt-5">
              Your favourite Movies
            </h1>
            <div className="grid grid-cols-4 place-items-center">
              {favourites.length > 0 ? (
                favourites.map((movie) => (
                  <Card key={movie.id} className="m-4">
                    <CardHeader>
                      <CardTitle className="text-2xl">{movie.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <img
                        src={movie.image}
                        alt="movie_image"
                        className="rounded"
                      />
                      <div className="flex flex-col space-y-2 mt-3">
                        <p>Director: {movie.director}</p>
                        <p>Price: {movie.price} HUF</p>
                      </div>
                    </CardContent>
                    <CardFooter className="flex w-full items-center justify-center">
                      <Button
                        className="bg-emerald-500 hover:bg-red-400 hover:text-black hover:cursor-pointer hover:transition duration-300"
                        onClick={() => removeFavourite(movie.id)}
                      >
                        Remove from favourites
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-4 text-center">No favourites yet</div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>Please log in</div>
      )}
    </>
  );
};

export default Favourites;
