/**
 * 
 * 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，
 * 并返回他们的数组下标。
 * 你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。
 * 给定 nums = [2, 7, 11, 15], target = 9
 * 因为 nums[0] + nums[1] = 2 + 7 = 9所以返回 [0, 1]
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    var map = {};
    var index = nums.length;
    while(index--){
        
        var key = nums[index];
        if(!map[key]){
            map[key] =  [];     
        }
        map[key].push(index);
        var need = target - key;
        console.log(need)
        if(need === key){
            if(map[key].length>=2){
                return [map[key][0],map[key][1]];
            }
            continue;
        }
        if(map[need]){
            return [index,map[need][0]];
        }
    }
};
console.log(twoSum([2, 7, 11, 15],26))