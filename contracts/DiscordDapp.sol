// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';

contract DiscordDapp is ERC721 {
    uint256 public totalSupply;
    uint256 public totalChannels;
    address public owner;

    struct Channel {
        uint256 id;
        string name;    
        uint256 cost;
    }

    mapping(uint256 => Channel) public channels;
    mapping (uint256 => mapping (address=>bool)) public hasJoined;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor(string memory name_, string memory symbol_) ERC721(name_, symbol_) {
        owner = msg.sender;
    }

    function createChannel(string memory name,uint256 cost) public onlyOwner {
        totalChannels++;
        channels[totalChannels] = Channel({
            id: totalChannels,
            name: name,
            cost: cost
        });
    }

    function mint(uint256 _id) public payable {
        require(_id != 0, "Channel does not exist");
        require(_id <= totalChannels, "Channel does not exist");
        require(msg.value >= channels[_id].cost, "Not enough ether");
        require(!hasJoined[_id][msg.sender], "Already joined");
        hasJoined[_id][msg.sender] = true;

        totalSupply++;
        _safeMint(msg.sender, totalSupply);
    }

    function getChannel(uint256 id) public view returns (Channel memory) {
        return channels[id];
    }

    function withdraw() public onlyOwner {
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success, "Withdrawal failed");
    }
}
