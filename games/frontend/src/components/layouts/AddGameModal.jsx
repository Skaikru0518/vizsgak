import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useAuth } from '@/context/authContext';
import { toast } from 'sonner';
import { axiosInstance } from '@/utils/axiosInstance';
import { API_PATH } from '@/utils/apiPaths';
const AddGameModal = ({ open, onClose }) => {
  if (!open) return null;
  const [gameName, setGameName] = useState('');
  const [developer, setDeveloper] = useState('');
  const [price, setPrice] = useState(0);
  const [cover, setCover] = useState('');
  const { token } = useAuth();

  const addNewGame = async () => {
    const payload = {
      name: gameName,
      dev: developer,
      price: price,
      cover: cover,
      token: token,
    };
    try {
      const response = await axiosInstance.post(API_PATH.addGame, payload);
      toast.success('Succesfully added a new game!');
    } catch (error) {
      toast.error('Error adding new game');
      console.error('Error adding new game', error);
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-500  hover:text-red-500 hover:cursor-pointer"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4">Add New Game</h2>
        {/* Itt lehet a form */}
        <form onSubmit={addNewGame}>
          <Input
            type="text"
            placeholder="Game name"
            className="border rounded w-full mb-3 p-2"
            onChange={(e) => setGameName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Developer"
            className="border rounded w-full mb-3 p-2"
            onChange={(e) => setDeveloper(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Price"
            className="border rounded w-full mb-3 p-2"
            onChange={(e) => setPrice(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Cover URL"
            className="border rounded w-full mb-3 p-2"
            onChange={(e) => setCover(e.target.value)}
          />
          <Button
            type="submit"
            className="w-full bg-green-500 mt-2 hover:cursor-pointer hover:transition duration-300"
          >
            Add
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddGameModal;
