
import {useState} from 'react';
import NFTCard from "../components/nftCard";
const Home = () => {

  const [wallet,setWalletAddress] = useState("");
  const [collection,setCollectionAddress] = useState("");
  const [NFTs, setNFTs] = useState([]);
  const [fetchForCollection,setFetchForCollection]=useState(false);

  const fetchNFTs = async() =>{
    let nfts;
    console.log("Fetching NFTs");
    const api_key = process.env.API_KEY;
    const baseURL = 'https://eth-mainnet.g.alchemy.com/v2/${api_key}/getNFTs/';
    var requestOptions = {
      method: 'GET'
    };
    if(!collection.length){
      const fetchURL = `$baseURL?owner=${wallet}`;
      nfts = await fetch(fetchURL,requestOptions).then(data=>data.json);
    }else{
      console.log("Fetching NFTs for collection owned by address");
      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
      nfts = await fetch(fetchURL,requestOptions).then(data=>data.json());
    }
    if(nfts){
      console.log("nfts ",nfts);
      setNFTs(nfts.ownedNfts);
    }
  }

  const fetchNFTsForCollection = async () =>{
	if(collection.length){
		var requestOptions = {
			method: 'GET'
		};
		const api_key = process.env.API_KEY;
		const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${api_key}/getNFTsForCollection/`
		const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata={"true"}`;
		const nfts = await fetch(fetchURL,requestOptions).then(data=>data.json());

		if(nfts){
			console.log("NFTs in collection: ",nfts);
			setNFTs(nfts.nfts);
		}
	}
  }
  return (
    <div className="flex flex-col items-center justify-center py-8 gap-y-3">
      <div className="flex flex-col w-full justify-center items-center gap-y-2">
        <input disabled={fetchForCollection} type={"text"} placeholder="Add your wallet address "></input>
        <input type={"text"} placeholder="Add the collection address"></input>
        <label className="text-gray-600 "><input type={"checkbox"} onChange={(e)=>{setFetchForCollection(e.target.checked)}} className="mr-2"></input>Fetch for collection</label>
        <button 
          className={"disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5"} 
          onClick={
            () => {
				if(fetchForCollection){
					fetchNFTsForCollection();
				}else{
					fetchNFTs();
				}
            }
          }
          >Fetch NFTs
        </button>
      </div>
	  <div className="flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center">
		{
			NFTs.length >0 && NFTs.map(nfts=>{
				return (
					<NFTCard nft={nfts}></NFTCard>
				)
			})
		}
	  </div>
    </div>
  )
}

export default Home

?pageKey=${pageKey}