// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

/// @title CurationStation: a platform for art curators
/// @author Panasthetik

/// @dev this is a factory contract; imports exhibitions template

import "./Exhibition.sol";

/// @dev uses ownable and pausable for security

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CurationStation is Ownable, Pausable {

/// @notice index of launched exhibitions by address for home page
/// @dev could add to and destructure array for future main page with more info


    address[] public launchedExhibitions;

/// @dev variables for exhibition template

    string internal Title;
    string internal Description;
    uint internal SuggestedGoal;
    string internal CuratorName;
    string internal ArtKeyword;

    
/// @dev pausable functionality restricted to ownable

    function pause() public onlyOwner {
        _pause();
    }
    
    function unpause() public onlyOwner {
        _unpause();
    }
    

/// @dev emits an event for project started; for newsfeed component on future implementation

    event ProjectStarted(
       uint indexed minimumPatronage,
       string indexed Title,
       string indexed Description,
       address curator
       
    );

/// @notice launches an exhibition and creates new contract
/// @dev bulk of gas costs is for this contract creation on mainnet; port to Polygon or other L2 in future    


    function launchExhibition(uint minimum, string memory title,
        string memory description, uint suggestedgoal,
        string memory curatorname, string memory artkeyword) public whenNotPaused {

        Title = title;
        Description = description;
        SuggestedGoal = suggestedgoal;
        CuratorName = curatorname;
        ArtKeyword = artkeyword;
        Exhibition newExhibition = new Exhibition(minimum, title, description,
        suggestedgoal, curatorname, artkeyword, msg.sender);
        launchedExhibitions.push(address(newExhibition));

        
        emit ProjectStarted(minimum, title, description, msg.sender);
    }

/// @dev getter function for main page exhibition indexing


    function getLaunchedExhibitions() public view returns (address[] memory){
        return launchedExhibitions;
        
    }
    
}
