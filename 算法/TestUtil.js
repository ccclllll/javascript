/**
 * 对数器
 */

var testUtil = {
    arrayGenerator:function(size,value){
        size = Math.random()*(size+1);
        var ret = new Array(size);
        for(var index = 0;index< ret.length;i++){
            ret[index] = Math.random()*(value+1) - Math.random()*(value+1);
        }
        return ret;
    },
    copyArray: function (array) {
        var ret = [];
        array.array.forEach((element, index) => {
            ret[index] = element;
        });
        return ret;
    },
    equal: function (array1, array2) {
        if (array1.__proto__.constructor !== Array || 
            array2.__proto__.constructor !== Array || array1.length !== array2.length) {
            return false;
        }

        for(var i = 0;i<array1.length;i++){
            if(array1[i]!==array2[i]){
                return false;
            }
        }
    },
    test:function(rightMethod,testMethod,value,size,time){
        if(typeof rightMethod !== 'function' || typeof testMethod !== 'function'){
            throw'parameter error';
        }

        for(var count = 0;count<time;count++){
            var array = this.arrayGenerator(size,value);
            var copyArray = this.copyArray(array);
            var copyArray1 = this.copyArray(array);
        
            if( !this.equal(rightMethod(copyArray),testMethod(array)) ){
                return {
                    errorMsg:'erro',
                    testData: copyArray1
                }
                
            }
        }
    }
}

