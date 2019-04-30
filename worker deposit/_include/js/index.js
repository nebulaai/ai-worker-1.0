let nebula = new Nebula();
let wallet = new Wallet();
let ledgerWallet = new Wallet();

function back(){
    $('.after').css({'display': 'none'});
    $('.before').css({'display': 'block'});
}

function loadLedger(){
    nebula.connectLedger($("#apiUrl").val(), $("#rpcProviderUrl").val());
    nebula.prepareContracts().then(()=>{
        $('.before').css({'display': 'none'});
        $('.after').css({'display': 'block'});
        let elem = $("#ledgerStatus");
        elem.text("Connected");
        elem.css("color", "green");

        $("#loadedLedgerApiUrl").text(nebula.url.api);
        $("#loadedLedgerRpcUrl").text(nebula.url.http_provider);
        $("#loadedDepositContract").text(nebula.addresses.depositAddress);
        $("#loadedManagerContract").text(nebula.addresses.managerAddress);
        $("#loadedWorkerCreditContract").text(nebula.addresses.workerAddress);

        nebula.getWorkers().then(result=>{
            $("#currentWorkerCount").text(result.workers.length);
            $("#currentTaskCount").text(result.tasks.length);
            $("#currentActiveCount").text(result.actives.length);
            let listElem = $("#workerList");
            if (result.workers.length > 0 ){
                result.workers.forEach(element => {
                    listElem.append(`
<li>
<table>
<tr>
<td>worker id</td>
<td>${element.id}</td>
</tr>
<tr>
<td>gpu</td>
<td>${JSON.stringify(element.hardware.gpu)}</td>
</tr>
<tr>
<td>ram</td>
<td>${element.hardware.ram}</td>
</tr>
<tr>
<td>benchmark</td>
<td>${element.benchmark}</td>
</tr>
<tr>
<td>price limit</td>
<td>${element.price_limit}</td>
</tr>
</table>
</li>`
                    )
                })
            }else if (result.workers.length === 0) {
                listElem.empty();
            }
        }).catch(console.log);
    });
}


function loadWallet(){
    let address = $("#wallet").val();
    address = address.toLowerCase().indexOf('0x') == 0 ? address.trim() : '0x' + address.trim();
    wallet.setWallet(address);
    let pk = $("#pk").val();
    pk = pk.toLowerCase().indexOf('0x') == 0 ? pk.trim() : '0x' + pk.trim();
    wallet.setPrivateKey(pk);
    // console.log('pk', pk)
    $("#walletLoaded span").text("Wallet Loaded");
    getCurrentWalletBalance();
    getCurrentDeposit();
    getAllowanceToGroup();
}

function transferNBAI(){
    nebula.transferNBAI(wallet, $("#transferToWallet").val(), $("#transferAmount").val()).then(console.log).catch(console.log)
}

function loadLedgerWallet(){
    ledgerWallet.setWallet($("#ledgerWallet").val());
    ledgerWallet.setPrivateKey($("#ledgerPk").val());
    $("#ledgerWalletLoaded").text("Yes");
    nebula.getBalance(ledgerWallet).then(balance=>{
        $("#ledgerBalance").text(balance);
    }).catch(console.log);
}

function isWalletValid(){
    //todo would be useful to check this
}

function getCurrentWalletBalance(){
    nebula.getBalance(wallet).then(balance=>{
        $("#currentBalance").text(balance);
    }).catch(console.log);
}

function getCurrentDeposit(){
    nebula.getDeposit(wallet).then(balance => {
        $("#currentDeposit").text(balance);
    }).catch(console.log);
}
function getAllowanceToGroup(){
    nebula.getAllowance(wallet).then(allowance => {
        $("#currentAllowance").text(allowance);
    }).catch(console.log);
}
function depositAndApproveToGroup(){
    nebula.depositAndApprove(wallet, $("#depositAndApproveAmount").val()).then(console.log).catch(console.log);
}

function depositOnly(){
    nebula.depositOnly(wallet, $("#depositAmount").val()).then(console.log).catch(console.log);
}

function updateAllowance(){
    nebula.setAllowance(wallet, $("#allowanceAmount").val()).then(console.log).catch(console.log);
}

function withdrawDeposit(){
    nebula.withdrawDeposit(wallet, $("#withdrawAmount").val()).then(console.log).catch(console.log);
}

function getWorkerCredit(){
    let id = $("#workerId").val();
    nebula.getWorkerCredit(id)
        .then(worker=>{
            /*$("#workerCredit span").text('Current Credit: ' + worker.credits + ' (estimated working hour:' + worker.credits / 2000 + ')');
            */
            $("#workerCredit span").text('Current Credit: ' + worker.credits + ' NBAI');
            $("#banned").text(worker.banned ? "BANNED" : "Not Banned");
            return nebula.isEligible(id);
        })
        .then(eligible=>{
            if(eligible){
                $("#eligibility").text('Eligible');
                $("#eligibility").css({'color': 'green'})
            }
            else{
                $("#eligibility").text('Not Eligible');
                $("#eligibility").css({'color': 'red'})
            }
            
        })
        .catch(console.log);
}

function depositWorkerCredit(){
    nebula.depositWorkerCredit(wallet, $("#workerId").val(), $("#workerCreditAmount").val() + '000000000000000000').then(
        res => {
            $('#depositStatus span').text('Deposit successful.');
            getWorkerCredit();
        }        
        ).catch(console.log);
}

function submitTask(){
    let p = $("#params").val();
    if (p === undefined){
        p=""
    }
    nebula.createTask(
        wallet,
        $("#taskName").val(),
        $("#scriptUrl").val(),
        $("#dataUrl").val(),
        $("#outputUrl").val(),
        p,
        $("#unitFee").val(),
        Number($("#duration").val()),
        Number($("#benchmark").val()),
        Number($("#gpuCount").val())).then(data=>{
            console.log(data);
            //todo check status
            $("#creationHash").text(data.Result.hash);
            getTaskId(data.Result.hash);
    });
}

function getTaskId(hash){
    console.log("waiting for task ID");
    nebula.getTaskIdByHash(hash).then(r=>{
        let id = r.contract;
        if ( id !== "") $("#taskIDCreated").text(id);
        else setTimeout(()=>getTaskId(hash), 5000);
    }).catch(console.log);
}

function cancelTask(){
    nebula.cancelTask(wallet, $("#taskIdCancel").val(), true).then(console.log).catch(console.log);
}

function unbanWorker(){
    nebula.unbanWorker(ledgerWallet, $("#unbanWorkerId").val(), false);
}

function ledgerWithdraw(){
    nebula.ledgerWithdraw(ledgerWallet, $("#ledgerWithdrawAmount").val());
}

function getTaskIdByHash(){
    nebula.getTaskIdByHash($("#creationHash"));
}

$(document).ready(function(){
    $('#workerCreditAmount').keyup(function(){
        $('#estimate').text('estimated working hour: ' + $(this).val() / 2000);
        console.log('estimated working hour: ' + parseInt($(this).val()) / 2000);
    })
})
