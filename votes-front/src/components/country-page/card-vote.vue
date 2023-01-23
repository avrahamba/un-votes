<script>
export default{
    props:{
        vote: Object
    },
    data(){
        return{
            classType:[
                'vote-bed',
'vote-neutral',
'vote-good'
]
        }
    },
    computed:{
        status(){
            if(this.vote.last === 'B')return 0
            if(this.vote.last === 'G')return 2
            return 1
        }
    }
}
</script>

<template>
    <div class="vote" :class="classType[status]">
        <div class="descrition">{{ $t('descrition') }}: {{$t(vote.descrition)}}</div>
        <div class="good">הצבעות בעד ישראל: {{ vote.countG }}</div>
        <div class="noutral">הצבעות נטרליות: {{ vote.countA }}</div>
        <div class="good">הצבעות נגד ישראל: {{ vote.countB }}</div>
        <div class="good">תאריך הצבעה אחרונה: {{ vote.lastDate }}</div>
        <div class="good">בהצבעה האחרונה המדינה הצביעה: {{ vote.last }}</div>
      <!-- {{ vote }} -->
    </div>
</template>

<style scoped>
.vote{
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius: 4px;
    padding: 8px;
}

.vote-neutral{
    background-color: #fff;
}

.vote-bed{
    background-color: #fc8cc0;
}
.vote-good{
    background-color: #80ddbe;
}

</style>