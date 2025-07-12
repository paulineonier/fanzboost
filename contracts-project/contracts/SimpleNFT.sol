// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SimpleNFT is ERC721, Ownable {
    uint256 public nextTokenId;

    event Minted(address indexed to, uint256 indexed tokenId);

    constructor() ERC721("SimpleNFT", "SNFT") {}

    function mint(address to) external onlyOwner returns (uint256) {
        uint256 tokenId = nextTokenId;
        _safeMint(to, tokenId);
        nextTokenId++;

        emit Minted(to, tokenId);

        return tokenId;
    }
}
