
import {useState} from 'react';
import NFTCard from "../components/nftCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Home = () => {

	const [wallet,setWalletAddress] = useState("");
	const [collection,setCollectionAddress] = useState("");
	const [NFTs, setNFTs] = useState([]);
	const [fetchForCollection,setFetchForCollection]=useState(false);
	const [isLoading, setLoading] = useState(false);

	const api_key = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;

	const fetchNFTs = async() =>{
		let nfts;
		console.log("Fetching NFTs");
		const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTs/`;
		var requestOptions = {
			method: 'GET'
		};
		if(!collection.length){
			const fetchURL = `${baseURL}?owner=${wallet}`;
			console.log("Fetching URL", fetchURL);
			nfts = await fetch(fetchURL,requestOptions).then(data=>data.json());
		}else{
			console.log("Fetching NFTs for collection owned by address");
			const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
			nfts = await fetch(fetchURL,requestOptions).then(data=>data.json());
		}
		if(nfts.totalCount>0){
			console.log("nfts ",nfts);
			setNFTs(nfts.ownedNfts);
		}
	}

	
	const fetchNFTsForCollection = async () =>{
		if(collection.length){
			var requestOptions = {
				method: "GET",
				// mode:'no-cors',
				// redirect: 'follow'
			};
			const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTsForCollection/`
			const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`;
			const nfts = await fetch(fetchURL,requestOptions).then(data=>data.json());
			
			if(nfts){
				console.log("NFTs in collection: ",nfts);
				setNFTs(nfts.nfts);
			}
		}
	}

	async function callGetNFTsForCollectionOnce(startToken = "") {
		const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTsForCollection/`
		const fetchURL = `${baseURL}/?contractAddress=${contractAddr}&startToken=${startToken}`;
		const response = fetch(fetchURL,requestOptions).then(data=>data.json());
		return response.data;
	}

	const fetchNFTsForCollectionPaginated = async () =>{
		if(collection.length){
			var requestOptions = {
				method: "GET",
				// mode:'no-cors',
				// redirect: 'follow'
			};
			
			
			if(nfts){
				console.log("NFTs in collection: ",nfts);
				setNFTs(nfts.nfts);
			}
		}
	}
	
	return (
		<div className="flex flex-col items-center justify-center py-8 gap-y-3">
			<div className="flex flex-col w-full justify-center items-center gap-y-2">

				<input 
					value={wallet}
					onChange={(e)=>{setWalletAddress(e.target.value)}}
					disabled={fetchForCollection}
					type={"text"} 
					placeholder="Add your wallet address "
				/>

				<input 
					value={collection}
					onChange={(e)=>{setCollectionAddress(e.target.value)}}
					type={"text"} 
					placeholder="Add the collection address"
				/>

				<label className="text-gray-600 ">
					<input 
						type={"checkbox"} 
						onChange={(e)=>{setFetchForCollection(e.target.checked)}} 
						className="mr-2"
					/>
					Fetch for collection
				</label>

				<button 
					disabled={isLoading}
					className={"disabled:bg-slate-500 hover:bg-blue-700 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5"} 
					onClick={()=>{
						if(fetchForCollection){
							fetchNFTsForCollection();
						}else{
							fetchNFTs()
						}
					}}
					>Fetch NFTs
				</button>
			</div>
		<div className="flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center">
		{isLoading ? <FontAwesomeIcon icon={faSpinner} spin size="4x"/> : 
					NFTs.length && NFTs.map((nft,i) => {
						return (
							<NFTCard nft={nft} key={i}/> // Added key to get rid of the warning every child prop
							// should have a key
						)
					})
				}
		</div>
		</div>
	)
	
}

export default Home

