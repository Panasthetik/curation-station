const assert = require("assert");
const CurationStation = artifacts.require("CurationStation");
const Exhibition = artifacts.require("Exhibition");

// For the first test, we verify that the factory contract can launch an exhibition.

contract("CurationStation", async accounts => {
    it("can launch an Exhibition", async () => {
        let exhibitionAddress;
      
        let station = await CurationStation.deployed();

        await station.launchExhibition(200, "videoart", "many artists", 100000, "Bill", "videoart", {from: accounts[0]});
       
        [exhibitionAddress] = await station.getLaunchedExhibitions();
    
        let exhibition = await Exhibition.at(exhibitionAddress);
        await exhibition.makeContribution({from: accounts[1], value: '300'});
        let summary = await exhibition.getSummary();
       

        assert.equal(summary[0].toString(), '200');
        assert.equal(summary[1].toString(), '300');
        assert.equal(summary[2].toString(), 'videoart');
        assert.equal(summary[3].toString(), 'many artists');
        assert.equal(summary[4].toString(), '0');
        assert.equal(summary[5].toString(), '1');
        assert.equal(summary[6].toString(), '100000');
        assert.equal(summary[7].toString(), 'Bill');
        assert.equal(summary[8].toString(), 'videoart');

        
        assert.equal(summary[9].toString(), accounts[0]);
       

    });
});

contract("Exhibition", async accounts => {

// For the second test, we verify the new Exhibition has a Curator address assigned.
    
    it("has a Curator", async () => {
        let exhibitionAddress;
        let initialBalance = await web3.eth.getBalance(accounts[1]);
        let station = await CurationStation.deployed();
        await station.launchExhibition(200, "videoart", "many artists", 100000, "Bill", "videoart", {from: accounts[0]});
        [exhibitionAddress] = await station.getLaunchedExhibitions();
        let exhibition = await Exhibition.at(exhibitionAddress);
        let curator = await exhibition.curator(); 
        assert (web3.utils.isAddress(curator));

    });

// For the third test, we establish a minimum patronage and confirm the value.

    it("has a minimum patronage", async () => {
        let exhibitionAddress;
        let initialBalance = await web3.eth.getBalance(accounts[1]);
        let station = await CurationStation.deployed();
        await station.launchExhibition(200, "videoart", "many artists", 100000, "Bill", "videoart", {from: accounts[0]});
        [exhibitionAddress] = await station.getLaunchedExhibitions();
        let exhibition = await Exhibition.at(exhibitionAddress);
        let minimumPatronage = await exhibition.minimumPatronage();

        assert.equal(200, minimumPatronage);
    });

// For the fourth test, we check if the Exhibition accepts Patron contributions / new Patrons.

    it("accepts Patron contributions", async () => {
        let exhibitionAddress;
        let initialBalance = await web3.eth.getBalance(accounts[1]);
        let station = await CurationStation.deployed();
        await station.launchExhibition(200, "videoart", "many artists", 100000, "Bill", "videoart", {from: accounts[0]});
        [exhibitionAddress] = await station.getLaunchedExhibitions();
        let exhibition = await Exhibition.at(exhibitionAddress);

        await exhibition.makeContribution({from: accounts[1], value: '200'});
        const isPatron = await exhibition.patronEndorsers(accounts[1]);
        assert(isPatron);

    })

// For the fifth test, we make sure Curator can create an Expense Proposal.

    it("allows the Curator to make an expense proposal", async () => {
        let exhibitionAddress;
        let station = await CurationStation.deployed();
        await station.launchExhibition(200, "videoart", "many artists", 100000, "Bill", "videoart", {from: accounts[0]});
        [exhibitionAddress] = await station.getLaunchedExhibitions();
        let exhibition = await Exhibition.at(exhibitionAddress);

        await exhibition.makeContribution({from: accounts[1], value: '200'});

        await exhibition.createExpenseProposal("Buy supplies", "100", accounts[1], {from: accounts[0]});
        const proposal = await exhibition.expenseproposals[0];
        const proposalcount = await exhibition.getProposalsCount();

        assert.equal(proposalcount, 1);
       
    });

// For the sixth test, we confirm that Expense Proposals can be processed.
 
    it("can process expense proposals.", async () => {
        let exhibitionAddress;
        let station = await CurationStation.new();
        await station.launchExhibition(200, "videoart", "many artists", 100000, "Bill", "videoart", {from: accounts[0]});
        [exhibitionAddress] = await station.getLaunchedExhibitions();
        let exhibition = await Exhibition.at(exhibitionAddress);

        await exhibition.makeContribution({from: accounts[5], value: 201});
        await exhibition.createExpenseProposal("Buy Supplies", "100", accounts[4], { from: accounts[0]});
        await exhibition.endorseProposal(0, { from: accounts[5], gas: "1000000"});
        await exhibition.finalizeProposal(0, { from: accounts[0], gas: "1000000"});

    });

// For the seventh test, we confirm that the Patron count increases once per unique contributor.
   
    it("increases the Patron count once per unique contributor (address)", async () => {
        let exhibitionAddress;
        let initialBalance = await web3.eth.getBalance(accounts[1]);
        let station = await CurationStation.deployed();
        await station.launchExhibition(200, "videoart", "many artists", 100000, "Bill", "videoart", {from: accounts[0]});
        [exhibitionAddress] = await station.getLaunchedExhibitions();
        let exhibition = await Exhibition.at(exhibitionAddress);
        
        await exhibition.makeContribution({from: accounts[1], value: '200'});
        await exhibition.makeContribution({from: accounts[2], value: '200'});
        await exhibition.makeContribution({from: accounts[3], value: '200'});
        let summary = await exhibition.getSummary();
        let patronEndorsersCount = summary[5].toString();


        assert.equal(3, patronEndorsersCount);
    });

});




