// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

/// @title Exhibition: template file for CurationStation
/// @author Panasthetik

/// @dev this is the exhibitions template

contract Exhibition {

/// @notice this is the struct for expense proposals
/// @dev this creates a proposal array for this exhibition

    struct ExpenseProposal {
        string description;
        uint value;
        address payable recipient;
        bool complete;
        uint endorseCount;
        mapping(address => bool) endorsements;
        
    }

/// @dev restate variables for constructor

    address public curator;
    uint public minimumPatronage;
    uint public patronEndorsersCount;
    
    string internal Description;
    string internal Title;

    uint internal SuggestedGoal;
    string internal CuratorName;
    string internal ArtKeyword;
    
/// @dev map patrons to bool; is patronEndorser
/// @dev map expense proposal struct to an array

    mapping(address => bool) public patronEndorsers;
    uint public proposalsCount;
    mapping (uint => ExpenseProposal) public expenseproposals;

/// @dev creates a modifier for curator only

    modifier restricted() {
        require(msg.sender == curator, "you are not the Curator");
        _;
    }

/// @dev creates a modifier for expense proposals; must be funded with at least minimum.

    modifier onlyFunded() {
        require(address(this).balance >= minimumPatronage, "must be funded with minimum");
        _;
    }


/// @notice creates the contract and sets parameters
/// @dev parameters preloaded for exhibition summary; cannot be edited due to gas costs


    constructor (uint minimum, string memory title, string memory description,
    uint suggestedgoal, string memory curatorname, string memory artkeyword, address creator) {
        curator = creator;
        minimumPatronage = minimum;
        Title = title;
        Description = description;
        SuggestedGoal = suggestedgoal;
        CuratorName = curatorname;
        ArtKeyword = artkeyword;
    }


/// @notice allows a patron to make a contribution
/// @dev limits to minimum patronage


    function makeContribution() public payable {
        require(msg.value >= minimumPatronage, "Not enough funds");
        if (patronEndorsers[msg.sender] != true){
     
        patronEndorsers[msg.sender] = true;
        patronEndorsersCount++;        
    }
}

/// @notice allows a curator to create an expense proposal
/// @dev curators only modifier; follows expense proposal struct
/// @dev requires an equivalent balance to create proposal


    function createExpenseProposal(string memory description, uint value, address payable recipient)
    public restricted onlyFunded returns (uint proposalID) {
        proposalID = proposalsCount++;

        ExpenseProposal storage newProposal = expenseproposals[proposalID];
            newProposal.description = description;
            newProposal.value = value;
            newProposal.recipient = recipient;
            newProposal.complete = false;
            newProposal.endorseCount = 0;
    
    require(newProposal.value <= address(this).balance, "must have minimum funding for proposal");

    }

/// @notice allows a patron to endorse an expense proposal
/// @dev adds to the endorseCount
/// @dev patrons cannot endorse twice
/// @dev verifies is patron



    function endorseProposal(uint index) public {

        ExpenseProposal storage proposal = expenseproposals[index];


        require(patronEndorsers[msg.sender]);
        require(!proposal.endorsements[msg.sender]);

        proposal.endorsements[msg.sender] = true;
        proposal.endorseCount++;
    }

/// @notice allows a curator to finalize an expense proposal
/// @notice transfers funds to vendor address if 50% endorsement is reached by patrons
/// @dev curators only modifier; patrons cannot finalize
/// @dev checks effects interaction; precaution against state change after transfer

   function finalizeProposal(uint index) public payable restricted {
        ExpenseProposal storage proposal = expenseproposals[index];
        
        require(proposal.endorseCount > (patronEndorsersCount / 2 ));
        require(!proposal.complete);
        
        address recipient = address(proposal.recipient);
        proposal.value == 0;
        (bool success, ) = recipient.call{value: proposal.value}("");
        require(success, "Transfer failed");
        proposal.complete = true;
        
    }

/// @notice queries the exhibition data and updates all dynamic info: budget remaining, proposals etc.
/// @notice provides data for the exhibition summary page
/// @dev obtains all data with one call; 



    function getSummary() public view returns (uint, uint, string memory, string memory,
    uint, uint, uint, string memory, string memory, address) {
        
        return (
            minimumPatronage,
            address(this).balance,
            Title,
            Description,
            proposalsCount,
            patronEndorsersCount,
            SuggestedGoal,
            CuratorName,
            ArtKeyword,
            curator
        );
    }

/// @dev creates index for the proposals table based on proposalID

    function getProposalsCount() public view returns (uint) {
        return proposalsCount;
    }

}