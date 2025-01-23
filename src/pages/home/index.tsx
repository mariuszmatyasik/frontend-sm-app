import Layout from "@/components/layout";
import { Input } from "@/components/ui/input";
import * as React from "react";
import Stories from '@/components/stories';
import { Search} from "lucide-react";

interface IHomeProps {}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
  return (
    <Layout>
      
        <div className="flex flex-col">
          <div className="relative mn-6 w-full text-gray-600">
              <Input className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-sm text-base focus:outline-none "
              placeholder="search"
              type = "search" 
              name = "search"
              />
             <button type="submit" className="aboslute right-2.5 top-2.5 " >
              <Search className="w-5 h-5 text-gray-400"/>
             </button>
          </div>
          <div className="mb-5 overflow-y-auto">
            <h2 className="mb-5">Stories</h2>

            <Stories />
          </div>
          <div className="mb-5">
            <h2 className="mb-5">Feed</h2>
          </div>  
            <div className="w-full flex justify-center">
              <div className="flex flex-col max-w-sm rounded overflow-hidden"></div>
            </div>

          </div>
          
          
    </Layout>
  );
};

export default Home;
