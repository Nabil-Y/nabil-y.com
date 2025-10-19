<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import nabil from "@/assets/img/nabil.png";
</script>

<template>
	<Avatar class="w-12 h-12">
		<AvatarImage
			:src="nabil"
			alt="Nabil Yassine"
		/>
		<AvatarFallback>Nabil Yassine</AvatarFallback>
	</Avatar>
</template>
