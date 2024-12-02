<script>
    import { Card } from 'flowbite-svelte';

    export let transfers = [
        {
            label: "Transfer from",
            title: "The Friday Night Comedy Show",
            date: "Friday, November 19, 2023, 8:30pm",
        },
        {
            label: "Transfer to",
            title: "The Friday Night Comedy Show",
            date: "Friday, August 16, 2024, 8:30pm",
        },
    ];
</script>

<div class="w-full p-4">
    <Card class="bg-gray-50 border border-gray-300 rounded-lg w-full" size="auto"  >
        <div class="flex justify-between flex-wrap p-4">
            {#each transfers as transfer}
                <div class="w-1/2">
                    <p class="text-sm font-normal text-Text-Tartiary">{transfer.label}:</p>
                    <p class="text-xl font-normal text-Text-Primary">{transfer.title}</p>
                    <p class="text-sm font-normal text-Text-Tartiary">{transfer.date}</p>
                </div>
            {/each}
        </div>
    </Card>
</div>
