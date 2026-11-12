import {duelBothOrders,validatePack}from './index.mjs';
export async function roundRobinBothOrders(options,{pack,provider,maxRequests=40}={}){
 const fail=()=>{throw new TypeError('Tournoi invalide ou budget dépassé / Invalid tournament or exceeded budget / Torneo inválido o presupuesto excedido');};
 if(!Array.isArray(options)||options.length<2||options.length>16||options.some(x=>typeof x!=='string'||!x.trim())||new Set(options).size!==options.length||!Number.isSafeInteger(maxRequests)||maxRequests<0||maxRequests>512||typeof provider!=='function')fail();validatePack(pack);const required=options.length*(options.length-1);if(required>maxRequests)fail();const rows=[],scores=options.map(option=>({option,consistentWins:0,consistentLosses:0,ties:0,inconsistentPairs:0}));
 for(let i=0;i<options.length;i++)for(let j=i+1;j<options.length;j++){const result=await duelBothOrders(options[i],options[j],{pack,provider});rows.push({left:options[i],right:options[j],...result});if(!result.consistent){scores[i].inconsistentPairs++;scores[j].inconsistentPairs++;}else if(result.winner==='tie'){scores[i].ties++;scores[j].ties++;}else{const win=result.winner==='a'?i:j,lose=win===i?j:i;scores[win].consistentWins++;scores[lose].consistentLosses++;}}
 return {pairs:rows,scores,requests:required,universalRankingProven:false,positionEffectsEstimatedGenerally:false};
}
