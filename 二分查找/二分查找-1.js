/**
 * 
 * @param {*} piles 
 * @param {*} H 
 * 875. 爱吃香蕉的珂珂
 */
var minEatingSpeed = function(piles, H) {
    /**
     * 开始难以看到二分查找，从暴力法开始
     * 然后找二分查找的痕迹 
     */
    let right = getMax(piles)+1, left = 1
    while(left<right){
        let mid = left + Math.floor((right - left) / 2)
        if(canFinish(piles,mid,H)){
            right = mid
        }else{
            left = mid+1
        }
    }
    return left

    function getMax(piles){
        let max = 0
        for(let i=0;i<piles.length;i++){
            max = Math.max(max,piles[i])
        }
        return max
    }
    function isFinish(n,speed){
        let hour = Math.floor(n/speed) + ((n%speed>0)?1:0)
        return hour
    }
    function canFinish(piles,speed,H){
        /**
         * 以当前的速度吃，如果吃完的时候，hour小于H,返回True
         */
        let sum = 0
        for(let i=0;i<piles.length;i++){
            sum +=isFinish(piles[i],speed)
        }
        return sum<=H
    }
};

var shipWithinDays = function(weights, D) {
    let [left, right] = sumSlice(weights)
    right++

    while(left<right){
        let mid = left + Math.floor((right-left)/2)
        if(canConvert(weights,mid,D)){
            right = mid
        }else{
            left = mid+1 // 一定不能写mid++
        }
    }
    return left

    function sumSlice(w){
        let sum = 0
        let max = 0
        for(let i=0;i<w.length;i++){
            sum+=w[i]
            max = Math.max(w[i],max)
        }
        return [max,sum]
    }

    function canConvert(weights,cap,D){
        /**
         * 以当前的速度吃，如果吃完的时候，hour小于H,返回True
         */
        let i=0
        for(let day=0;day<D;day++){
            let maxCap = cap
            while((maxCap-=weights[i])>=0){
                // 如果能把前几天的货物给运输
                i++
                if(i===weights.length){
                    return true
                }
            }
        }
        return false
    }
};

// console.log(shipWithinDays([1,2,3,4,5,6,7,8,9,10],5))
// let mid = 0
// let l = 3
// l = mid++
// console.log(l,mid)

const minEatingBananaSpeed = function(piles,H){
    let left = 0, right = Math.max(...piles);
    while(left<=right){
        let mid = left + Math.floor((right - left)/2);
        if(canFinish(piles,mid,H)){
            right = mid;
        }else{
            left = mid + 1;
        }
    }
    return left;
    function canFinish(piles,speed,H){
        // 判断是否能够以当前的speed在H小时里吃完Piles
        // 吃一堆香蕉需要多少时间
        let hour = 0;
        for(let i=0;i<piles.length;i++){
            hour +=Math.floor(piles[i]/speed) + (piles[i]%speed===0?0:1);
        }
        return hour<=H;
    }
} 



const shipWithinDaysPro = function(weights, D){
    let left = Math.max(...weights);
    let right = null;
    for(let i=0;i<weights.length;i++){
        right +=weights[i];
    }
    right++;
    while(left<right){
        let mid = left + Math.floor((right - left)/2);
        if(canConvertNWeights(weights,mid,D)){
            right = mid;
        }else{
            left = mid + 1;
        }
    }
    return left;
    function canConvertNWeights(weights, speed, D){
        let i = 0;
        for(let day=0;day<D;day++){
            let maxCap = speed;
            while((maxCap-=weights[i])>=0){
                // 以当前的speed能搬几个箱子
                i++;
                if(i===weights.length){
                    return true;
                }
            }
        }
        return false;
    }
}

console.log(shipWithinDaysPro([1,2,3,4,5,6,7,8,9,10],5));

// console.log(minEatingBananaSpeed([30,11,23,4,20],5));
console.log("abcde".substr(1,2));