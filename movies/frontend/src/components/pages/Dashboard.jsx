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
import { toast } from 'sonner';
import { Button } from '../ui/button';

const Dashboard = () => {
  const { isLoggedIn } = useAuth();
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await axiosInstance.get(API_PATH.getMovies);
        if (response.status === 200) {
          setMovies(response.data);
        }
        console.log(response.data);
      } catch (error) {
        toast.error('Error fetching movies');
        console.error('Error fetching movies:', error);
      }
    };
    getMovies();
  }, []);

  const addFavourite = async (id) => {
    const payload = {
      username: localStorage.getItem('userName'),
      userId: localStorage.getItem('userId'),
    };
    try {
      const response = await axiosInstance.post(
        `${API_PATH.addFavourite}/${id}`,
        payload,
      );
      if (response.status === 201) {
        toast.success('Succesfully added to favourites');
      }
    } catch (error) {
      toast.error('Error adding movie to favourites');
      console.error('Error adding movie to favourites:', error);
    }
  };
  return (
    <>
      {isLoggedIn ? (
        <div className="flex justify-center w-full ">
          <div className="container flex flex-col text-center  space-y-12">
            <h1 className="text-3xl font-semibold mt-5">Browse Movies</h1>
            <div className="grid grid-cols-4">
              {movies.map((movie) => (
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
                      className="bg-emerald-500 hover:bg-emerald-400 hover:text-black hover:cursor-pointer hover:transition duration-300"
                      onClick={() => addFavourite(movie.id)}
                    >
                      Add to favourite
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>Please log in</div>
      )}
    </>
  );
};

export default Dashboard;
