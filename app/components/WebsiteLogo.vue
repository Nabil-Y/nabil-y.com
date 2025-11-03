<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import nabil from "@/assets/img/nabil.png";
</script>

<template>
	<Avatar class="w-12 h-12">
		<AvatarImage
			:src="nabil"
			alt="Vector drawing of my orange cat Tsukki and me"
		/>
		<AvatarFallback>Nabil Yassine</AvatarFallback>
	</Avatar>
</template>
