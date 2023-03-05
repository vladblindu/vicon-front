<div class="w-full flex items-center flex-col">
    <div class="flex bg-white shadow-md p-4 rounded-md">
        <div data-placeholder class="mr-2 h-20 w-20 rounded-full overflow-hidden relative bg-gray-200">

        </div>
        <div class="flex flex-col justify-between">
            <div data-placeholder class="mb-2 h-5 w-40 overflow-hidden relative bg-gray-200">

            </div>
            <div data-placeholder class="h-10 w-40 overflow-hidden relative bg-gray-200">

            </div>
        </div>
    </div>
</div>


<style>
    [data-placeholder]::after {
        content: " ";
        box-shadow: 0 0 50px 9px rgba(254,254,254);
        position: absolute;
        top: 0;
        left: -100%;
        height: 100%;
        animation: load 1s infinite;
    }
    @keyframes load {
        0%{ left: -100%}
        100%{ left: 150%}
    }
</style>